;; Quantum Entanglement Experiment Contract

(define-map experiments
  { experiment-id: uint }
  {
    researcher: principal,
    description: (string-utf8 500),
    results: (optional (string-utf8 1000)),
    status: (string-ascii 20)
  }
)

(define-data-var experiment-count uint u0)

(define-public (create-experiment (description (string-utf8 500)))
  (let
    (
      (new-experiment-id (+ (var-get experiment-count) u1))
    )
    (map-set experiments
      { experiment-id: new-experiment-id }
      {
        researcher: tx-sender,
        description: description,
        results: none,
        status: "ongoing"
      }
    )
    (var-set experiment-count new-experiment-id)
    (ok new-experiment-id)
  )
)

(define-public (update-experiment-results (experiment-id uint) (results (string-utf8 1000)))
  (let
    (
      (experiment (unwrap! (map-get? experiments { experiment-id: experiment-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get researcher experiment)) (err u403))
    (ok (map-set experiments
      { experiment-id: experiment-id }
      (merge experiment { results: (some results), status: "completed" })
    ))
  )
)

(define-read-only (get-experiment (experiment-id uint))
  (ok (map-get? experiments { experiment-id: experiment-id }))
)

(define-read-only (get-experiment-count)
  (ok (var-get experiment-count))
)

