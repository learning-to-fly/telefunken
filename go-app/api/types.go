package api

import (
	"time"

	"github.com/mongodb/mongo-go-driver/bson/primitive"
)

type Topic struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Title     string             `bson:"title" json:"title"`
	Text      string             `bson:"text" json:"text"`
	CreatedAt time.Time          `bson:"created_at" json:"createdDate"`
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
	Title string `json:"title"`
	Text  string `json:"text"`
}

type UpdatePageResponse struct {
	CommonResponse
}

type DeletePageResponse struct {
	CommonResponse
}
