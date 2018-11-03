package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/learning-to-fly/telefunken/go-app/api"
)

type Storage interface {
	Get(ctx context.Context, id string) (*api.Topic, error)
	Put(ctx context.Context, topic api.Topic) (string, error)
	GetAll(ctx context.Context) ([]api.Topic, error)
	WaitClose(timeout time.Duration) error
}

type Application struct {
	addr string
	DB   Storage
}

func New(addr string, db Storage) Application {
	return Application{
		addr: addr,
		DB:   db,
	}
}

func (app *Application) Run(ctx context.Context) error {
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)

	router.Get("/all", app.handlerAll)
	router.Get("/page/{pageID}", app.handlerGetPage)
	router.Post("/page", app.handlerPutPage)

	fsStatic := http.FileServer(http.Dir("./reactapp/build"))
	router.Get("/*", func(resp http.ResponseWriter, req *http.Request) {
		fsStatic.ServeHTTP(resp, req)
	})

	log.Printf("listen application on http://%s/", app.addr)
	return http.ListenAndServe(app.addr, router)
}

// testing: curl -i http://127.0.0.1:3080/all
func (app *Application) handlerAll(resp http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	topics, err := app.DB.GetAll(ctx)
	if err != nil {
		errorOut(err, resp)
		return
	}

	if err := json.NewEncoder(resp).Encode(topics); err != nil {
		errorOut(err, resp)
		return
	}
}

// testing: curl -i http://127.0.0.1:3080/page/XXXXXXX
func (app *Application) handlerGetPage(resp http.ResponseWriter, req *http.Request) {
	pageID := chi.URLParam(req, "pageID")
	ctx := req.Context()

	topic, err := app.DB.Get(ctx, pageID)
	if err != nil {
		errorOut(err, resp)
		return
	}

	if err := json.NewEncoder(resp).Encode(topic); err != nil {
		errorOut(err, resp)
		return
	}
}

// testing: curl -i -X POST -d '{"title":"1232", "text":"some text"}' 'http://127.0.0.1:3080/page'
func (app *Application) handlerPutPage(resp http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	defer req.Body.Close()
	reqParam := api.NewPageRequest{}
	if err := json.NewDecoder(req.Body).Decode(&reqParam); err != nil {
		errorOut(err, resp)
		return
	}

	topic := api.Topic{
		Title: reqParam.Title,
		Text:  reqParam.Text,
	}

	id, err := app.DB.Put(ctx, topic)
	if err != nil {
		errorOut(err, resp)
		return
	}

	if err := json.NewEncoder(resp).Encode(api.NewPageResponse{ID: id}); err != nil {
		errorOut(err, resp)
		return
	}
}

func errorOut(err error, resp http.ResponseWriter) {
	resp.WriteHeader(http.StatusInternalServerError)
	errorMsg := fmt.Sprintf("error: %s", err.Error())
	resp.Write([]byte(errorMsg))
}
