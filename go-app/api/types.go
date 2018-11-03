package api

import (
	"time"

	"github.com/mongodb/mongo-go-driver/bson/objectid"
)

type Topic struct {
	ID        objectid.ObjectID `bson:"_id,omitempty" json:"-"`
	IDJson    string            `bson:"-" json:"_id"`
	Title     string            `bson:"title" json:"title"`
	Text      string            `bson:"text" json:"text"`
	CreatedAt time.Time         `bson:"created_at" json:"createdDate"`
}

type CommonResponse struct {
	Result string `json:"result"`
	Error  string `json:"error,omitempty"`
}

func (cr *CommonResponse) SetOk() {
	cr.Result = "ok"
}

func (cr *CommonResponse) SetError(err error) {
	cr.Result = "error"
	cr.Error = err.Error()
}

type NewPageRequest struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

type NewPageResponse struct {
	CommonResponse
	ID string `json:"_id"`
}

type UpdatePageRequest struct {
	ID    string `json:"_id"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

type UpdatePageResponse struct {
	CommonResponse
}
