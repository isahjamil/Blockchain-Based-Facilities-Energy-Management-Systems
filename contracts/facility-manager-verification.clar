;; Facility Manager Verification Contract
;; Validates and manages facility managers

(define-map facility-managers principal bool)
(define-map manager-details principal {
  name: (string-ascii 50),
  facility-id: (string-ascii 20),
  certification-level: uint,
  verified-at: uint
})

(define-data-var contract-owner principal tx-sender)

;; Error constants
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-ALREADY-VERIFIED (err u101))
(define-constant ERR-NOT-FOUND (err u102))

;; Verify a facility manager
(define-public (verify-manager (manager principal) (name (string-ascii 50)) (facility-id (string-ascii 20)) (cert-level uint))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (asserts! (is-none (map-get? facility-managers manager)) ERR-ALREADY-VERIFIED)
    (map-set facility-managers manager true)
    (map-set manager-details manager {
      name: name,
      facility-id: facility-id,
      certification-level: cert-level,
      verified-at: block-height
    })
    (ok true)
  )
)

;; Check if manager is verified
(define-read-only (is-verified-manager (manager principal))
  (default-to false (map-get? facility-managers manager))
)

;; Get manager details
(define-read-only (get-manager-details (manager principal))
  (map-get? manager-details manager)
)

;; Revoke manager verification
(define-public (revoke-manager (manager principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-NOT-AUTHORIZED)
    (asserts! (is-some (map-get? facility-managers manager)) ERR-NOT-FOUND)
    (map-delete facility-managers manager)
    (map-delete manager-details manager)
    (ok true)
  )
)
