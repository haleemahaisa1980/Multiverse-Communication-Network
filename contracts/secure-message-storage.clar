;; Secure Message Storage Contract

(define-map encrypted-messages
  { message-id: uint }
  {
    sender: principal,
    encrypted-content: (buff 1024),
    timestamp: uint,
    protocol-id: uint
  }
)

(define-data-var message-count uint u0)

(define-public (store-message (encrypted-content (buff 1024)) (protocol-id uint))
  (let
    (
      (new-message-id (+ (var-get message-count) u1))
    )
    (map-set encrypted-messages
      { message-id: new-message-id }
      {
        sender: tx-sender,
        encrypted-content: encrypted-content,
        timestamp: block-height,
        protocol-id: protocol-id
      }
    )
    (var-set message-count new-message-id)
    (ok new-message-id)
  )
)

(define-read-only (get-message (message-id uint))
  (ok (map-get? encrypted-messages { message-id: message-id }))
)

(define-read-only (get-message-count)
  (ok (var-get message-count))
)

