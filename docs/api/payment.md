# AssoConnect API — Payment

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## ElectronicInvoice

### `POST /api/v1/electronic_invoices`

Creates a ElectronicInvoice resource.

**Request body:**

- `name` `string` — 
- `type` `string` — 
- `date` `AbsoluteDate-ElectronicInvoice.create` — 
- `thirdParty` `string` — 
- `organization` `Organization-ElectronicInvoice.create` — 
- `currency` `Currency-ElectronicInvoice.create` — 
- `dueDate` `` — 
- `comment` `string` — 
- `api:actions` `string` — 

---

### `GET /api/v1/electronic_invoices/{id}`

Retrieves a ElectronicInvoice resource.

**Path parameters:**

- `id` — ElectronicInvoice identifier

---

### `PATCH /api/v1/electronic_invoices/{id}`

Updates the ElectronicInvoice resource.

**Path parameters:**

- `id` — ElectronicInvoice identifier

**Request body:**

- `api:actions` `string` — 

---

### `GET /api/v1/electronic_invoices/{id}/actions`

Retrieves a ElectronicInvoice resource.

**Path parameters:**

- `id` — ElectronicInvoice identifier

---

### `POST /api/v1/electronic_invoices/{id}/actions/{name}`

Creates a ElectronicInvoice resource.

**Path parameters:**

- `id` — ElectronicInvoice identifier

**Request body:**

- `invoiceItems` `array` — 
- `parent` `string` — 
- `increment` `string` — 
- `nonprofit` `string` — 
- `emitter` `InvoiceParticipant` — 
- `receiver` `InvoiceParticipant` — 
- `name` `string` — 
- `type` `string` — 
- `date` `AbsoluteDate` — 
- `thirdParty` `string` — 
- `organization` `Organization` — 
- `currency` `Currency` — 
- `status` `string` — 
- `dueDate` `` — 
- `comment` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `accountingExportStatus` `string` — 
- `path` `string` — 
- `migrated` `boolean` — 
- `exportedToAccounting` `boolean` — 
- `toBeExportedToAccounting` `boolean` — 
- `accountingDate` `` — 
- `exportDate` `` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 
- `api:actions` `string` — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/electronic_invoices`

Retrieves the collection of ElectronicInvoice resources.

**Path parameters:**

- `nonprofitId` — ElectronicInvoice identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

### `GET /api/v1/organizations/{organizationId}/electronic_invoices`

Retrieves the collection of ElectronicInvoice resources.

**Path parameters:**

- `organizationId` — ElectronicInvoice identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

## ElectronicInvoicingOnboarding

### `GET /api/v1/electronic_invoicing_onboardings/{id}`

Retrieves a ElectronicInvoicingOnboarding resource.

**Path parameters:**

- `id` — ElectronicInvoicingOnboarding identifier

---

### `GET /api/v1/nonprofits/{nonprofitId}/electronic_invoicing_onboarding`

Retrieves a ElectronicInvoicingOnboarding resource.

**Path parameters:**

- `nonprofitId` — ElectronicInvoicingOnboarding identifier

---

### `POST /api/v1/nonprofits/{nonprofitId}/electronic_invoicing_onboarding/refresh_status`

Creates a ElectronicInvoicingOnboarding resource.

**Path parameters:**

- `nonprofitId` — ElectronicInvoicingOnboarding identifier

---

## Installment

### `GET /api/v1/installments`

Retrieves the collection of Installment resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `dueAt[before]` — 
- `dueAt[strictly_before]` — 
- `dueAt[after]` — 
- `dueAt[strictly_after]` — 
- `order.organization` *(required)* — Installment order.organization
- `order.organization[]` — 
- `order.transaction.user.firstname` — 
- `order.transaction.user.lastname` — 
- `order.transaction.shopperEmail` — 
- `order.transaction.shopperEmail[]` — 
- `status` — 
- `status[]` — 
- `order[dueAt]` — 
- `order[order.id]` — 

---

### `GET /api/v1/installments/{id}`

Retrieves a Installment resource.

**Path parameters:**

- `id` — Installment identifier

---

### `GET /api/v1/orders/{orderId}/installments`

Retrieves the collection of Installment resources.

**Path parameters:**

- `orderId` — Installment identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `dueAt[before]` — 
- `dueAt[strictly_before]` — 
- `dueAt[after]` — 
- `dueAt[strictly_after]` — 
- `order.organization` *(required)* — 
- `order.organization[]` — 
- `order.transaction.user.firstname` — 
- `order.transaction.user.lastname` — 
- `order.transaction.shopperEmail` — 
- `order.transaction.shopperEmail[]` — 
- `status` — 
- `status[]` — 
- `order[dueAt]` — 
- `order[order.id]` — 

---

## Invoice

### `GET /api/v1/invoices/{id}`

Retrieves a Invoice resource.

**Path parameters:**

- `id` — Invoice identifier

---

### `POST /api/v1/invoices/{id}/export`

Creates a Invoice resource.

**Path parameters:**

- `id` — Invoice identifier

**Request body:**

- `invoiceItems` `array` — 
- `comment` `string` — 
- `number` `string` — This property is not unique. Indeed, we can have the same $number value for an invoice and a credit note
- `increment` `integer` — 
- `street1` `string` — 
- `street2` `string` — 
- `postal` `string` — 
- `city` `string` — 
- `administrativeArea1` `string` — 
- `administrativeArea2` `string` — 
- `country` `string` — 
- `nonprofit` `string` — 
- `paidAt` `` — 
- `internalComment` `string` — 
- `organization` `Organization` — 
- `currency` `Currency` — 
- `type` `string` — 
- `date` `AbsoluteDate` — 
- `startsAt` `` — 
- `endsAt` `` — 
- `status` `string` — 
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `accountingExportStatus` `string` — 
- `brand` `string` — 
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `clock` `ClockInterface` — 
- `accountingRecordId` `string` — 
- `accountingDate` `AbsoluteDate` — 
- `address` `boolean` — 
- `amount` `Money` — 
- `totalVatIncludedFromItems` `Money` — 
- `exportedToAccounting` `boolean` — 
- `toBeExportedToAccounting` `boolean` — 
- `exportDate` `` — 
- `brandAsEnum` `string` — 
- `updatedAt` `string` — 
- `idAsObject` `string` — 

---

### `GET /api/v1/organizations/{id}/invoices`

Retrieves the collection of Invoice resources.

**Path parameters:**

- `id` — Invoice identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 
- `type` — 
- `type[]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 

---

## Operation

### `GET /api/v1/operations/{id}`

Retrieves a Operation resource.

**Path parameters:**

- `id` — Operation identifier

---

### `POST /api/v1/operations/{id}/export`

Export the operation to accounting

**Path parameters:**

- `id` — Operation identifier

**Request body:**

- `id` `string` — 
- `type` `string` — 
- `amount` `Money` — 
- `settledAt` `string` — 
- `status` `string` — 
- `appId` `string` — 
- `transactionId` `integer` — 
- `paymentRequestId` `string` — 
- `tapToPayRequestId` `string` — 
- `transactionParentId` `integer` — 
- `refundEntityId` `string` — 
- `refundEntityType` `string` — 
- `collectName` `string` — 
- `person` `string` — 
- `bankAccountApiDto` `` — 
- `invoiceId` `string` — 
- `accountingRecordId` `string` — 
- `accountingExportStatus` `string` — 
- `publicComment` `string` — 

---

### `GET /api/v1/psp_sub_wallets/{pspSubWalletId}/operations`

Retrieves the collection of Operation resources.

**Path parameters:**

- `pspSubWalletId` — Operation identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `status` — 
- `status[]` — 
- `settledAt[before]` — 
- `settledAt[strictly_before]` — 
- `settledAt[after]` — 
- `settledAt[strictly_after]` — 
- `personId` — 
- `personId[]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `type` — 
- `type[]` — 
- `invoiceId` — 
- `invoiceId[]` — 

---

### `POST /api/v1/psp_sub_wallets/{pspSubWalletId}/operations/send-extract`

Creates a Operation resource.

**Path parameters:**

- `id` — Operation identifier

**Request body:**

- `id` `string` — 
- `type` `string` — 
- `amount` `Money` — 
- `settledAt` `string` — 
- `status` `string` — 
- `appId` `string` — 
- `transactionId` `integer` — 
- `paymentRequestId` `string` — 
- `tapToPayRequestId` `string` — 
- `transactionParentId` `integer` — 
- `refundEntityId` `string` — 
- `refundEntityType` `string` — 
- `collectName` `string` — 
- `person` `string` — 
- `bankAccountApiDto` `` — 
- `invoiceId` `string` — 
- `accountingRecordId` `string` — 
- `accountingExportStatus` `string` — 
- `publicComment` `string` — 

---

## Order

### `GET /api/v1/orders/{id}`

Retrieves a Order resource.

**Path parameters:**

- `id` — Order identifier

---

## Payment

### `GET /api/v1/installments/{id}/payments`

Retrieves the collection of Payment resources.

**Path parameters:**

- `id` — Payment identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/payments/{id}`

Retrieves a Payment resource.

**Path parameters:**

- `id` — Payment identifier

---

## PaymentPageConfiguration

### `GET /api/v1/payment_page_configurations/{id}`

Retrieves a PaymentPageConfiguration resource.

**Path parameters:**

- `id` — PaymentPageConfiguration identifier

---

## PaymentRequest

### `GET /api/v1/organizations/{organizationId}/payment_requests`

Retrieves the collection of PaymentRequest resources.

**Path parameters:**

- `organizationId` — PaymentRequest identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `email` — 
- `id` — 
- `id[]` — 
- `person.id` — 
- `person.id[]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `payments` — Filter on payment status
- `payments[]` — Filter on payment statuses
- `request_active` — Filter on payment request active status

---

### `POST /api/v1/payment_requests`

Creates a PaymentRequest resource.

**Request body:**

- `disabledBy` `` — 
- `money` `Money-paymentRequest.create` — 
- `organization` `Organization-paymentRequest.create` — 
- `createdBy` `PasswordUser-paymentRequest.create` — 
- `email` `string` — 
- `person` `string` — 
- `description` `string` — 

---

### `POST /api/v1/payment_requests/multiple`

Creates multiple request resources.

**Request body:**

- `paymentRequests` `array` — 

---

### `GET /api/v1/payment_requests/{id}`

Retrieves a PaymentRequest resource.

**Path parameters:**

- `id` — PaymentRequest identifier

---

### `PUT /api/v1/payment_requests/{id}/disable`

Replaces the PaymentRequest resource.

**Path parameters:**

- `id` — PaymentRequest identifier

**Request body:**

- `disabledAt` `string` — 
- `disabledBy` `` — 
- `isPaid` `boolean` — 
- `payments` `array` — 
- `money` `Money` — 
- `organization` `Organization` — 
- `createdBy` `PasswordUser` — 
- `email` `string` — 
- `person` `string` — 
- `description` `string` — 
- `createdAt` `string` — Timestamp of the entity's creation
- `amount` `Money` — 
- `expiredAt` `AbsoluteDate` — 
- `active` `boolean` — 

---

## PaymentSettings

### `GET /api/v1/organizations/{organizationId}/payment_settings`

Retrieves a PaymentSettings resource.

**Path parameters:**

- `organizationId` — PaymentSettings identifier

---

### `POST /api/v1/payment_settings`

Creates a PaymentSettings resource.

**Request body:**

- `retributionMethod` `string` — 
- `organization` `Organization-PaymentSettings.create` — 

---

### `GET /api/v1/payment_settings/{id}`

Retrieves a PaymentSettings resource.

**Path parameters:**

- `id` — PaymentSettings identifier

---

### `PUT /api/v1/payment_settings/{id}`

Replaces the PaymentSettings resource.

**Path parameters:**

- `id` — PaymentSettings identifier

**Request body:**

- `retributionMethod` `string` — 

---

## PaymentSpecifications

### `GET /api/v1/organizations/{id}/payment_specifications`

Retrieves a PaymentSpecifications resource.

**Path parameters:**

- `id` — PaymentSpecifications identifier

---

### `GET /api/v1/payment_specifications`

Retrieves the collection of PaymentSpecifications resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/payment_specifications/{id}`

Retrieves a PaymentSpecifications resource.

**Path parameters:**

- `id` — PaymentSpecifications identifier

---

## TapToPayRequest

### `GET /api/v1/devices/{id}/tap_to_pay_requests`

Retrieves the collection of TapToPayRequest resources.

**Path parameters:**

- `id` — TapToPayRequest identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `payment` — Filter on payment status
- `payment[]` — Filter on payment statuses
- `createdBy.person.contact` — 
- `createdBy.person.contact[]` — 
- `createdAt[before]` — 
- `createdAt[strictly_before]` — 
- `createdAt[after]` — 
- `createdAt[strictly_after]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `id[between]` — 
- `id[gt]` — 
- `id[gte]` — 
- `id[lt]` — 
- `id[lte]` — 
- `receiptEmail` — 
- `receiptEmail[]` — 
- `payment.paymentRealization` — Filter on psp aggregate app id
- `search_multiple` — Filter on multiple properties
- `issueResolved` — 
- `order[id]` — 

---

### `GET /api/v1/organizations/{id}/tap_to_pay_requests`

Retrieves the collection of TapToPayRequest resources.

**Path parameters:**

- `id` — TapToPayRequest identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `payment` — Filter on payment status
- `payment[]` — Filter on payment statuses
- `createdBy.person.contact` — 
- `createdBy.person.contact[]` — 
- `createdAt[before]` — 
- `createdAt[strictly_before]` — 
- `createdAt[after]` — 
- `createdAt[strictly_after]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `id[between]` — 
- `id[gt]` — 
- `id[gte]` — 
- `id[lt]` — 
- `id[lte]` — 
- `receiptEmail` — 
- `receiptEmail[]` — 
- `payment.paymentRealization` — Filter on psp aggregate app id
- `search_multiple` — Filter on multiple properties
- `issueResolved` — 
- `order[id]` — 

---

### `GET /api/v1/tap_to_pay_requests/{id}`

Retrieves a TapToPayRequest resource.

**Path parameters:**

- `id` — TapToPayRequest identifier

---

### `PATCH /api/v1/tap_to_pay_requests/{id}`

Updates the TapToPayRequest resource.

**Path parameters:**

- `id` — TapToPayRequest identifier

**Request body:**

- `payment` `string` — 
- `receiptEmail` `string` — 
- `deviceCommentary` `string` — Comment sent from the app when an admin reports an incident for this payment
- `issueResolved` `boolean` — $issueResolved is null if there is no issue
- `organization` `Organization` — 
- `createdBy` `string` — 
- `comment` `string` — Comment set by the admin in the app after a payment.
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `amount` `Money` — 
- `currency` `Currency` — 
- `identifier` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `POST /api/v1/tap_to_pay_requests/{id}/send_receipt_email`

Creates a TapToPayRequest resource.

**Path parameters:**

- `id` — TapToPayRequest identifier

**Request body:**

- `payment` `string` — 
- `receiptEmail` `string` — 
- `deviceCommentary` `string` — Comment sent from the app when an admin reports an incident for this payment
- `issueResolved` `boolean` — $issueResolved is null if there is no issue
- `organization` `Organization` — 
- `createdBy` `string` — 
- `comment` `string` — Comment set by the admin in the app after a payment.
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `amount` `Money` — 
- `currency` `Currency` — 
- `identifier` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

## TapToPayRequestPayment

### `POST /api/v1/tap_to_pay_request_payments/{id}/refund`

Creates a TapToPayRequestPayment resource.

**Path parameters:**

- `id` — TapToPayRequestPayment identifier

**Request body:**

- `receiptDetails` `array` — 
- `deviceDailySummary` `` — 
- `request` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `paymentRealization` `GenericPaymentRealization` — 
- `organization` `Organization` — 
- `fees` `` — 
- `tips` `` — 
- `payableEntityIdentifier` `string` — 
- `deletedAt` `string` — 
- `clock` `ClockInterface` — 
- `amount` `Money` — 
- `currency` `Currency` — 
- `updatedAt` `string` — 

---

## TaxReceipt

### `GET /api/v1/nonprofits/{id}/tax_receipts`

Retrieves the collection of TaxReceipt resources.

**Path parameters:**

- `id` — TaxReceipt identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `person` — 
- `person[]` — 
- `status` — 
- `status[]` — 
- `exists[person.contact.email]` — 

---

### `GET /api/v1/tax_receipts/pdf/{id}`

Retrieves a TaxReceipt resource.

**Path parameters:**

- `id` — TaxReceipt identifier

---

### `GET /api/v1/tax_receipts/{id}`

Retrieves a TaxReceipt resource.

**Path parameters:**

- `id` — TaxReceipt identifier

---

## TaxReceiptSettings

### `GET /api/v1/nonprofits/{nonprofitId}/tax_receipt_settings`

Retrieves a TaxReceiptSettings resource.

**Path parameters:**

- `nonprofitId` — TaxReceiptSettings identifier

---

### `GET /api/v1/public/nonprofits/{nonprofitId}/tax_receipt_settings`

Retrieves a TaxReceiptSettings resource.

**Path parameters:**

- `nonprofitId` — TaxReceiptSettings identifier

---

### `GET /api/v1/tax_receipt_settings/{id}`

Retrieves a TaxReceiptSettings resource.

**Path parameters:**

- `id` — TaxReceiptSettings identifier

---

### `PUT /api/v1/tax_receipt_settings/{id}`

Replaces the TaxReceiptSettings resource.

**Path parameters:**

- `id` — TaxReceiptSettings identifier

**Request body:**

- `discount` `integer` — 
- `isEnable` `boolean` — 
- `enableStartDate` `` — 
- `firstname` `string` — 
- `lastname` `string` — 
- `jobTitle` `string` — 
- `customNotes` `string` — 

---

