package handlers

import (
	"net/http"
)

func mwWithContentType(contType string) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			resp.Header().Set("Content-Type", contType)
			next.ServeHTTP(resp, req)
		})
	}
}
