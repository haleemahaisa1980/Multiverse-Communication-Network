;; Protocol Manager Contract

(define-map communication-protocols
  { protocol-id: uint }
  {
    name: (string-ascii 50),
    description: (string-utf8 500),
    creator: principal,
    status: (string-ascii 20)
  }
)

(define-data-var protocol-count uint u0)

(define-public (create-protocol (name (string-ascii 50)) (description (string-utf8 500)))
  (let
    (
      (new-protocol-id (+ (var-get protocol-count) u1))
    )
    (map-set communication-protocols
      { protocol-id: new-protocol-id }
      {
        name: name,
        description: description,
        creator: tx-sender,
        status: "active"
      }
    )
    (var-set protocol-count new-protocol-id)
    (ok new-protocol-id)
  )
)

(define-public (update-protocol-status (protocol-id uint) (new-status (string-ascii 20)))
  (let
    (
      (protocol (unwrap! (map-get? communication-protocols { protocol-id: protocol-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get creator protocol)) (err u403))
    (ok (map-set communication-protocols
      { protocol-id: protocol-id }
      (merge protocol { status: new-status })
    ))
  )
)

(define-read-only (get-protocol (protocol-id uint))
  (ok (map-get? communication-protocols { protocol-id: protocol-id }))
)

(define-read-only (get-protocol-count)
  (ok (var-get protocol-count))
)

