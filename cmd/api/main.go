package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var port string

func init() {
	port = os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
}

var (
	metricsTotalRoutes = promauto.NewCounter(prometheus.CounterOpts{
		Name: "greymatter_meta_total_routes",
		Help: "The total number of processed events",
	})
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", index)
	r.Get("/api/v1", index)
	r.Get("/api/v2", index)
	r.Get("/api/v3", index)
	r.HandleFunc("/metrics", http.HandlerFunc(promhttp.Handler().(http.HandlerFunc)))

	metricsTotalRoutes.Add(float64(len(r.Routes())))
	fmt.Printf("Listening on %s\n", port)
	http.ListenAndServe(":"+port, r)
}

func index(w http.ResponseWriter, r *http.Request) {

}
