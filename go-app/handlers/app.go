package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/learning-to-fly/telefunken/go-app/api"
)

type Storage interface {
	Get(ctx context.Context, id string) (*api.Topic, error)
	Insert(ctx context.Context, topic api.Topic) (string, error)
	Update(ctx context.Context, idHex string, topic api.Topic) error
	GetAll(ctx context.Context) ([]api.Topic, error)
	Delete(ctx context.Context, idHex string) error
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

	router.Route("/v1", func(router chi.Router) {
		router.Use(mwWithContentType("application/json"))

		router.Get("/pages", app.handlerPages)
		router.Get("/page/{pageID}", app.handlerGetPage)
		router.Post("/page", app.handlerNewPage)
		router.Put("/page/{pageID}", app.handlerUpdatePage)
		router.Delete("/page/{pageID}", app.handlerDeletePage)
	})

	fsStatic := http.FileServer(http.Dir("./reactapp/build"))
	router.Get("/*", func(resp http.ResponseWriter, req *http.Request) {
		fsStatic.ServeHTTP(resp, req)
	})

	log.Printf("listen application on http://%s/", app.addr)
	return http.ListenAndServe(app.addr, router)
}

// testing: curl -s -i http://127.0.0.1:3080/v1/pages
func (app *Application) handlerPages(resp http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	topics, err := app.DB.GetAll(ctx)
	if err != nil {
		errorOut(err, resp)
		return
	}

	okOut(topics, resp)
}

// testing: curl -s -i http://127.0.0.1:3080/v1/page/XXXXXXX
func (app *Application) handlerGetPage(resp http.ResponseWriter, req *http.Request) {
	pageID := chi.URLParam(req, "pageID")
	ctx := req.Context()

	topic, err := app.DB.Get(ctx, pageID)
	if err != nil {
		errorOut(err, resp)
		return
	}

	okOut(topic, resp)
}

// testing: curl -s -i -X POST -d '{"title":"1232", "text":"some text"}' 'http://127.0.0.1:3080/v1/page'
func (app *Application) handlerNewPage(resp http.ResponseWriter, req *http.Request) {
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

	id, err := app.DB.Insert(ctx, topic)
	if err != nil {
		errorOut(err, resp)
		return
	}

	result := api.NewPageResponse{ID: id}
	result.SetOk()
	okOut(result, resp)
}

// testing: curl -s -i -X PUT -d '{"title":"1232", "text":"some text"}' 'http://127.0.0.1:3080/v1/page/5bde086c4b0fd41c148a0af2'
func (app *Application) handlerUpdatePage(resp http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	defer req.Body.Close()
	reqParam := api.UpdatePageRequest{}
	if err := json.NewDecoder(req.Body).Decode(&reqParam); err != nil {
		errorOut(err, resp)
		return
	}

	pageID := chi.URLParam(req, "pageID")
	topic := api.Topic{
		Title: reqParam.Title,
		Text:  reqParam.Text,
	}

	if err := app.DB.Update(ctx, pageID, topic); err != nil {
		errorOut(err, resp)
		return
	}

	result := api.UpdatePageResponse{}
	result.SetOk()
	okOut(result, resp)
}

// testing: curl -s -i -X DELETE 'http://127.0.0.1:3080/v1/page/5bde086c4b0fd41c148a0af2'
func (app *Application) handlerDeletePage(resp http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	pageID := chi.URLParam(req, "pageID")
	if err := app.DB.Delete(ctx, pageID); err != nil {
		errorOut(err, resp)
		return
	}

	result := api.DeletePageResponse{}
	result.SetOk()
	okOut(result, resp)
}

func okOut(result interface{}, resp http.ResponseWriter) {
	if err := json.NewEncoder(resp).Encode(result); err != nil {
		errorOut(err, resp)
	}
}

func errorOut(err error, resp http.ResponseWriter) {
	resp.WriteHeader(http.StatusBadRequest)

	res := api.CommonResponse{}
	res.SetError(err)
	if err := json.NewEncoder(resp).Encode(res); err != nil {
		log.Printf("failed to encode error: %s", err)
	}
}
