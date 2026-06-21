# AssoConnect API — Business Account

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## BankAccount

### `POST /api/v1/bank_accounts`

Creates a BankAccount resource.

**Request body:**

- `owner` `` — 
- `ledgerNumber` `integer` — For the API, calculated in BankAccountNormalizer and will be written by the persister
- `name` `string` — 
- `bankName` `string` — 
- `ownerName` `string` — Necessary for psp
- `shareWithEntireNetwork` `boolean` — 
- `type` `string` — 

---

### `GET /api/v1/bank_accounts/{id}`

Retrieves a BankAccount resource.

**Path parameters:**

- `id` — BankAccount identifier

---

### `PUT /api/v1/bank_accounts/{id}`

Replaces the BankAccount resource.

**Path parameters:**

- `id` — BankAccount identifier

**Request body:**

- `name` `string` — 
- `bankName` `string` — 
- `shareWithEntireNetwork` `boolean` — 

---

### `DELETE /api/v1/bank_accounts/{id}`

Removes the BankAccount resource.

**Path parameters:**

- `id` — BankAccount identifier

---

### `POST /api/v1/bank_accounts/{id}/unshare`

Creates a BankAccount resource.

**Path parameters:**

- `id` — BankAccount identifier

---

### `GET /api/v1/organizations/{organizationId}/bank_accounts`

Retrieves the collection of BankAccount resources.

**Path parameters:**

- `organizationId` — BankAccount identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## BankAccountPermission

### `POST /api/v1/bank_account_permissions`

Creates a BankAccountPermission resource.

**Request body:**

- `bankAccount` `string` — 
- `organization` `Organization` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `nonprofit` `string` — 
- `organizationName` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `DELETE /api/v1/bank_account_permissions/{id}`

Removes the BankAccountPermission resource.

**Path parameters:**

- `id` — BankAccountPermission identifier

---

### `GET /api/v1/bank_accounts/{bankAccountId}/permissions`

Retrieves the collection of BankAccountPermission resources.

**Path parameters:**

- `bankAccountId` — BankAccountPermission identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## BankEntry

### `GET /api/v1/bank_accounts/{bankAccount}/bank_entries`

Retrieves the collection of BankEntry resources.

**Path parameters:**

- `bankAccount` — BankEntry identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `date` — BankEntry date
- `amount[gt]` — BankEntry amount
- `amount[lt]` — BankEntry amount
- `amount[gte]` — BankEntry amount
- `amount[lte]` — BankEntry amount
- `name[]` — BankEntry name

---

### `POST /api/v1/bank_accounts/{bankAccount}/bank_entries`

Creates a BankEntry resource.

**Path parameters:**

- `bankAccount` — BankEntry identifier

**Request body:**

- `date` `AbsoluteDate` — 
- `name` `string` — 
- `amount` `Money` — 

---

### `GET /api/v1/bank_entries/{id}`

Retrieves a BankEntry resource.

**Path parameters:**

- `id` — BankEntry identifier

---

### `DELETE /api/v1/bank_entries/{id}`

Removes the BankEntry resource.

**Path parameters:**

- `id` — BankEntry identifier

---

### `PATCH /api/v1/bank_entries/{id}`

Updates the BankEntry resource.

**Path parameters:**

- `id` — BankEntry identifier

**Request body:**

- `status` `string` — 

---

## BankEntryBalance

### `GET /api/v1/bank_accounts/{bankAccount}/bank_entries_balance`

Retrieves a BankEntryBalance resource.

**Path parameters:**

- `bankAccount` — BankEntryBalance identifier

**Query parameters:**

- `date` — BankEntryBalance date
- `amount[gt]` — BankEntryBalance amount
- `amount[lt]` — BankEntryBalance amount
- `amount[gte]` — BankEntryBalance amount
- `amount[lte]` — BankEntryBalance amount
- `name[]` — BankEntryBalance name

---

## BankingSettings

### `GET /api/v1/banking_settings/{id}`

Retrieves a BankingSettings resource.

**Path parameters:**

- `id` — BankingSettings identifier

---

### `PUT /api/v1/banking_settings/{id}`

Replaces the BankingSettings resource.

**Path parameters:**

- `id` — BankingSettings identifier

**Request body:**

- `ownBankAccounts` `boolean` — 

---

### `GET /api/v1/organizations/{organizationId}/banking_settings`

Retrieves a BankingSettings resource.

**Path parameters:**

- `organizationId` — BankingSettings identifier

---

## CheckPaymentRealization

### `POST /api/v1/check_payment_realizations`

Creates a CheckPaymentRealization resource.

**Request body:**

- `receivedCheck` `ReceivedCheck-CheckPaymentRealization.write` — 
- `cmc7` `string` — 
- `rlmcKey` `string` — 

---

### `GET /api/v1/check_payment_realizations/{id}`

Retrieves a CheckPaymentRealization resource.

**Path parameters:**

- `id` — CheckPaymentRealization identifier

---

### `PUT /api/v1/check_payment_realizations/{id}`

Replaces the CheckPaymentRealization resource.

**Path parameters:**

- `id` — CheckPaymentRealization identifier

**Request body:**

- `receivedCheck` `ReceivedCheck-CheckPaymentRealization.write` — 
- `cmc7` `string` — 
- `rlmcKey` `string` — 

---

## CheckRemittance

### `POST /api/v1/check_remittances`

Creates a CheckRemittance resource.

**Request body:**

- `receivedChecks` `array` — 
- `date` `AbsoluteDate-CheckRemittance.write` — 
- `bankAccount` `string` — 
- `organization` `Organization-CheckRemittance.write` — 

---

### `GET /api/v1/check_remittances/{id}`

Retrieves a CheckRemittance resource.

**Path parameters:**

- `id` — CheckRemittance identifier

---

### `PUT /api/v1/check_remittances/{id}`

Replaces the CheckRemittance resource.

**Path parameters:**

- `id` — CheckRemittance identifier

---

### `DELETE /api/v1/check_remittances/{id}`

Removes the CheckRemittance resource.

**Path parameters:**

- `id` — CheckRemittance identifier

---

### `GET /api/v1/organizations/{organizationId}/check_remittances`

Retrieves the collection of CheckRemittance resources.

**Path parameters:**

- `organizationId` — CheckRemittance identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `bankAccount` — 
- `bankAccount[]` — 
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `order[amount]` — 
- `order[date]` — 
- `order[humanId]` — 
- `order[bankAccount.name]` — 

---

## KycSummary

### `GET /api/v1/kyc_summaries/{id}`

Retrieves a KycSummary resource.

**Path parameters:**

- `id` — KycSummary identifier

---

### `GET /api/v1/psp_wallets/{id}/kyc_summary`

Retrieves a KycSummary resource.

**Path parameters:**

- `id` — KycSummary identifier

---

## PettyCash

### `GET /api/v1/organizations/{organizationId}/petty_cash`

Retrieves the collection of PettyCash resources.

**Path parameters:**

- `organizationId` — PettyCash identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/petty_cash`

Creates a PettyCash resource.

**Request body:**

- `name` `string` *(required)* — Petty cash name
- `organization` `Organization-PettyCash.create` — 

---

### `GET /api/v1/petty_cash/{id}`

Retrieves a PettyCash resource.

**Path parameters:**

- `id` — PettyCash identifier

---

### `PUT /api/v1/petty_cash/{id}`

Replaces the PettyCash resource.

**Path parameters:**

- `id` — PettyCash identifier

**Request body:**

- `ledgerNumber` `integer` — Ledger number of the account.
- `name` `string` *(required)* — Petty cash name
- `organization` `Organization` — 
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `archivedAt` `string` — 
- `clock` `ClockInterface` — 
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `ledgerNumberFormatted` `string` — 
- `archived` `boolean` — 
- `updatedAt` `string` — 
- `idAsObject` `string` — 

---

### `DELETE /api/v1/petty_cash/{id}`

Removes the PettyCash resource.

**Path parameters:**

- `id` — PettyCash identifier

---

## ProAccountAccount

### `GET /api/v1/pro_account_accounts/pdf/{id}`

Retrieves a ProAccountAccount resource.

**Path parameters:**

- `id` — ProAccountAccount identifier

---

### `GET /api/v1/pro_account_accounts/{id}`

Retrieves a ProAccountAccount resource.

**Path parameters:**

- `id` — ProAccountAccount identifier

---

## ProAccountAccountHolder

### `GET /api/v1/organizations/{organizationId}/pro_account_account_holder`

Retrieves a ProAccountAccountHolder resource.

**Path parameters:**

- `organizationId` — ProAccountAccountHolder identifier

---

### `GET /api/v1/pro_account_account_holders/{id}`

Retrieves a ProAccountAccountHolder resource.

**Path parameters:**

- `id` — ProAccountAccountHolder identifier

---

## ProAccountAccountMembership

### `GET /api/v1/nonprofits/{nonprofitId}/pro_account_account_memberships`

Retrieves the collection of ProAccountAccountMembership resources.

**Path parameters:**

- `nonprofitId` — ProAccountAccountMembership identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `status` — 
- `status[]` — 
- `status!` — 
- `user` — 
- `user[]` — 
- `user.person` — 
- `user.person[]` — 
- `account.accountHolder.organization` — 
- `account.accountHolder.organization[]` — 

---

### `GET /api/v1/pro_account_account_memberships/{id}`

Retrieves a ProAccountAccountMembership resource.

**Path parameters:**

- `id` — ProAccountAccountMembership identifier

---

### `PUT /api/v1/pro_account_account_memberships/{id}/transitions/{transition}`

Replaces the ProAccountAccountMembership resource.

**Path parameters:**

- `id` — ProAccountAccountMembership identifier

**Request body:**

- `status` `string` — 
- `consent` `` — 
- `email` `string` — 
- `user` `string` — 
- `account` `string` — 
- `swanId` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `adminStatus` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `GET /api/v1/pro_account_accounts/{accountId}/memberships`

Retrieves the collection of ProAccountAccountMembership resources.

**Path parameters:**

- `accountId` — ProAccountAccountMembership identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `status` — 
- `status[]` — 
- `status!` — 
- `user` — 
- `user[]` — 
- `user.person` — 
- `user.person[]` — 
- `account.accountHolder.organization` — 
- `account.accountHolder.organization[]` — 

---

## ProAccountBeneficiary

### `GET /api/v1/pro_account_accounts/{account}/beneficiaries`

Retrieves the collection of ProAccountBeneficiary resources.

**Path parameters:**

- `account` — ProAccountBeneficiary identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `status[]` — ProAccountBeneficiary status
- `name[]` — ProAccountBeneficiary name

---

### `POST /api/v1/pro_account_beneficiaries`

Creates a ProAccountBeneficiary resource.

**Request body:**

- `account` `string` *(required)* — 
- `iban` `string` *(required)* — 
- `name` `string` — 
- `contact` `string` — 

---

### `GET /api/v1/pro_account_beneficiaries/{id}`

Retrieves a ProAccountBeneficiary resource.

**Path parameters:**

- `id` — ProAccountBeneficiary identifier

---

### `DELETE /api/v1/pro_account_beneficiaries/{id}`

Removes the ProAccountBeneficiary resource.

**Path parameters:**

- `id` — ProAccountBeneficiary identifier

---

### `PATCH /api/v1/pro_account_beneficiaries/{id}`

Updates the ProAccountBeneficiary resource.

**Path parameters:**

- `id` — ProAccountBeneficiary identifier

**Request body:**

- `contact` `string` — 

---

## ProAccountBindingError

### `GET /api/v1/pro_account_account_memberships/{membershipId}/binding_errors`

Retrieves the collection of ProAccountBindingError resources.

**Path parameters:**

- `membershipId` — ProAccountBindingError identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## ProAccountCheckPayment

### `GET /api/v1/pro_account_check_payments/{id}`

Retrieves a ProAccountCheckPayment resource.

**Path parameters:**

- `id` — ProAccountCheckPayment identifier

---

## ProAccountCountryOfOperation

### `GET /api/v1/pro_account_onboardings/{onboarding}/countries_of_operation`

Retrieves the collection of ProAccountCountryOfOperation resources.

**Path parameters:**

- `onboarding` — ProAccountCountryOfOperation identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

## ProAccountOnboarding

### `GET /api/v1/organizations/{organizationId}/pro_account_onboarding`

Retrieves a ProAccountOnboarding resource.

**Path parameters:**

- `organizationId` — ProAccountOnboarding identifier

---

### `POST /api/v1/organizations/{organizationId}/pro_account_onboarding/submitted`

Creates a ProAccountOnboarding resource.

**Path parameters:**

- `organizationId` — ProAccountOnboarding identifier

**Request body:**

- `accountHolder` `string` — 
- `swanStatus` `string` — 
- `swanId` `string` — 
- `swanUrl` `string` — 
- `data` `OnboardingInputDto` — 
- `organization` `Organization` — 
- `status` `string` — 
- `subscriptionPeriodAsked` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `onboardingFlowStatus` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `GET /api/v1/pro_account_onboardings/{id}`

Retrieves a ProAccountOnboarding resource.

**Path parameters:**

- `id` — ProAccountOnboarding identifier

---

### `PUT /api/v1/pro_account_onboardings/{id}`

Replaces the ProAccountOnboarding resource.

**Path parameters:**

- `id` — ProAccountOnboarding identifier

**Request body:**

- `data` `OnboardingInputDto-SwanOnboarding.write` — 
- `status` `string` — 
- `subscriptionPeriodAsked` `string` — 

---

### `POST /api/v1/pro_account_onboardings/{id}/request_opening_account`

Creates a ProAccountOnboarding resource.

**Path parameters:**

- `id` — ProAccountOnboarding identifier

**Request body:**

- `data` `OnboardingInputDto-SwanOnboarding.write` — 
- `status` `string` — 
- `subscriptionPeriodAsked` `string` — 

---

### `PUT /api/v1/pro_account_onboardings/{id}/transitions/{transition}`

Replaces the ProAccountOnboarding resource.

**Path parameters:**

- `id` — ProAccountOnboarding identifier

**Request body:**

- `accountHolder` `string` — 
- `swanStatus` `string` — 
- `swanId` `string` — 
- `swanUrl` `string` — 
- `data` `OnboardingInputDto` — 
- `organization` `Organization` — 
- `status` `string` — 
- `subscriptionPeriodAsked` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `onboardingFlowStatus` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

## ProAccountPayment

### `GET /api/v1/pro_account_accounts/{accountId}/payments`

Retrieves the collection of ProAccountPayment resources.

**Path parameters:**

- `accountId` — ProAccountPayment identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/pro_account_payments/{id}`

Retrieves a ProAccountPayment resource.

**Path parameters:**

- `id` — ProAccountPayment identifier

---

## ProAccountUser

### `GET /api/v1/pro_account_users/{id}`

Retrieves a ProAccountUser resource.

**Path parameters:**

- `id` — ProAccountUser identifier

---

### `PUT /api/v1/pro_account_users/{id}/transitions/{transition}`

Replaces the ProAccountUser resource.

**Path parameters:**

- `id` — ProAccountUser identifier

**Request body:**

- `status` `string` — 
- `swanId` `string` — 
- `accountMemberships` `array` — 
- `person` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `name` `string` — 
- `email` `string` — 
- `contactId` `string` — 
- `enabledMembership` `boolean` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

## ProAccountVerificationOfPayee

### `POST /api/v1/pro_account_accounts/{accountId}/verification_of_payee`

Creates a ProAccountVerificationOfPayee resource.

**Path parameters:**

- `accountId` — ProAccountVerificationOfPayee identifier

**Request body:**

- `iban` `string` *(required)* — 
- `name` `string` *(required)* — 
- `status` `string` — 
- `beneficiaryVerificationToken` `string` — 

---

## PspAggregate

### `GET /api/v1/psp_aggregates`

Retrieves the collection of PspAggregate resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/psp_aggregates`

Creates a PspAggregate resource.

**Request body:**

- `status` `string` — Indicates the current status of the online transaction. Check each status documentation for additional
information.
- `pspId` `string` — Represents PSP aggregate reference in PSP referential (i.e.: Payment reference # or Refund reference # in Adyen
referential). Optional
- `appId` `string` *(required)* — Represents PSP aggregate reference in app referential.
- `authorizedAt` `string` — DateTimeImmutable of the PspAggregate's authorization
- `settledAt` `string` — DateTimeImmutable of the PspAggregate's settled
- `method` `string` — The payment method used in the transaction the aggregate refers to.
- `pspTransactions` `array` — 
- `refusalReason` `` — 
- `cardType` `string` — 
- `cardBin` `string` — The Bank Identification Number of a credit card, which is the first six digits of a card number
- `cardHint` `string` — The last four digits of a card number
- `holderName` `string` — The holder name passed in the payment request
- `issuerName` `string` — 
- `issuerCountry` `string` — The country where the payment method was issued formatted in the ISO-3166 alpha-2 standard
- `cvcStatus` `string` — Information about the outcome of the CVC check returned by the issuer
- `avsStatus` `string` — Information about the outcome of the AVS check returned by the issuer
- `threeDSOffered` `boolean` — threeDSOffered from Notification:
A Boolean value indicating whether 3DS authentication offered for this payment.
- `threeDSAuthenticated` `boolean` — threeDSAuthenticated from Notification:
A Boolean value indicating whether 3DS authentication was completed on this payment.
- `liabilityShift` `boolean` — Indicates if a liability shift was offered for this payment
- `rawPspResponse` `string` — raw psp answer
- `pspFees` `` — 
- `organization` `Organization` — 
- `pspName` `string` *(required)* — References the PspTransportInterface used to proceed transaction aggregation (i.e.: "ADYEN")
- `action` `string` — The action the aggregate refers to.
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `clock` `ClockInterface` — 
- `ip` `string` — IP used when the entity is created
- `userAgent` `string` — User-agent from the browser
- `totalAmount` `Money` — 
- `refuse` `string` — 
- `error` `string` — 
- `3DSRefusalReason` `boolean` — 
- `paymentResponse` `string` — 
- `date` `AbsoluteDate` — 
- `is3DSRefusalReason` `boolean` — 
- `updatedAt` `string` — 
- `idAsObject` `string` — 

---

### `GET /api/v1/psp_aggregates/{id}`

Retrieves a PspAggregate resource.

**Path parameters:**

- `id` — PspAggregate identifier

---

### `DELETE /api/v1/psp_aggregates/{id}`

Removes the PspAggregate resource.

**Path parameters:**

- `id` — PspAggregate identifier

---

### `PATCH /api/v1/psp_aggregates/{id}`

Updates the PspAggregate resource.

**Path parameters:**

- `id` — PspAggregate identifier

**Request body:**

- `status` `string` — Indicates the current status of the online transaction. Check each status documentation for additional
information.
- `pspId` `string` — Represents PSP aggregate reference in PSP referential (i.e.: Payment reference # or Refund reference # in Adyen
referential). Optional
- `appId` `string` — Represents PSP aggregate reference in app referential.
- `authorizedAt` `string` — DateTimeImmutable of the PspAggregate's authorization
- `settledAt` `string` — DateTimeImmutable of the PspAggregate's settled
- `method` `string` — The payment method used in the transaction the aggregate refers to.
- `pspTransactions` `array` — 
- `refusalReason` `` — 
- `cardType` `string` — 
- `cardBin` `string` — The Bank Identification Number of a credit card, which is the first six digits of a card number
- `cardHint` `string` — The last four digits of a card number
- `holderName` `string` — The holder name passed in the payment request
- `issuerName` `string` — 
- `issuerCountry` `string` — The country where the payment method was issued formatted in the ISO-3166 alpha-2 standard
- `cvcStatus` `string` — Information about the outcome of the CVC check returned by the issuer
- `avsStatus` `string` — Information about the outcome of the AVS check returned by the issuer
- `threeDSOffered` `boolean` — threeDSOffered from Notification:
A Boolean value indicating whether 3DS authentication offered for this payment.
- `threeDSAuthenticated` `boolean` — threeDSAuthenticated from Notification:
A Boolean value indicating whether 3DS authentication was completed on this payment.
- `liabilityShift` `boolean` — Indicates if a liability shift was offered for this payment
- `rawPspResponse` `string` — raw psp answer
- `pspFees` `` — 
- `organization` `Organization` — 
- `pspName` `string` — References the PspTransportInterface used to proceed transaction aggregation (i.e.: "ADYEN")
- `action` `string` — The action the aggregate refers to.
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `clock` `ClockInterface` — 
- `ip` `string` — IP used when the entity is created
- `userAgent` `string` — User-agent from the browser
- `totalAmount` `Money` — 
- `refuse` `string` — 
- `error` `string` — 
- `3DSRefusalReason` `boolean` — 
- `paymentResponse` `string` — 
- `date` `AbsoluteDate` — 
- `is3DSRefusalReason` `boolean` — 
- `updatedAt` `string` — 
- `idAsObject` `string` — 

---

## PspAggregateTimeline

### `GET /api/v1/psp_aggregates/{id}/timeline`

Retrieves a PspAggregateTimeline resource.

**Path parameters:**

- `id` — PspAggregateTimeline identifier

---

## PspBankAccount

### `GET /api/v1/bank_accounts/{bankAccountId}/active_psp_bank_account`

Retrieves a PspBankAccount resource.

**Path parameters:**

- `bankAccountId` — PspBankAccount identifier

---

### `GET /api/v1/psp_bank_accounts/{id}`

Retrieves a PspBankAccount resource.

**Path parameters:**

- `id` — PspBankAccount identifier

---

### `DELETE /api/v1/psp_bank_accounts/{id}`

Removes the PspBankAccount resource.

**Path parameters:**

- `id` — PspBankAccount identifier

---

### `GET /api/v1/psp_wallets/{pspWalletId}/psp_bank_accounts`

Retrieves the collection of PspBankAccount resources.

**Path parameters:**

- `pspWalletId` — PspBankAccount identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## PspSubWallet

### `GET /api/v1/organizations/{id}/psp_sub_wallet`

Retrieves a PspSubWallet resource.

**Path parameters:**

- `id` — PspSubWallet identifier

---

### `GET /api/v1/organizations/{id}/psp_sub_wallets`

Retrieves the collection of PspSubWallet resources.

**Path parameters:**

- `id` — PspSubWallet identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/organizations/{id}/psp_sub_wallets`

Creates a PspSubWallet resource.

**Path parameters:**

- `id` — Organization identifier

**Request body:**

- `appId` `string` — Our ID for this sub-wallet
- `pspId` `string` — PSP generated ID
- `pspTransferLabel` `string` — Reference given by the PSP to get the label to be used
by our clients sending a money transfer to their sub-wallet
- `pspWallet` `PspWallet` — 
- `pspLifecycleStatus` `string` — Indicates the current status of the subWallet. Check each status documentation in the interface for additional
information.
- `ledgerNumber` `integer` — 
- `feesInvoiceRequired` `boolean` — 
- `organization` `Organization` — 
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `clock` `ClockInterface` — 
- `businessName` `string` — 
- `ledgerNumberFormatted` `string` — Returns the ledger number formatted on 3 digits with leading zeros if necessary
Ex: if ledger number is 7 then the method returns "007"
- `fromBalanceBalancePlatform` `boolean` — 
- `updatedAt` `string` — 
- `idAsObject` `string` — 

---

### `GET /api/v1/psp_sub_wallets/{id}`

Retrieves a PspSubWallet resource.

**Path parameters:**

- `id` — PspSubWallet identifier

---

## PspSubWalletBalances

### `GET /api/v1/psp_sub_wallet_balances/{id}`

Retrieves a PspSubWalletBalances resource.

**Path parameters:**

- `id` — PspSubWalletBalances identifier

---

### `GET /api/v1/psp_sub_wallets/{pspSubWalletId}/balances`

Retrieves a PspSubWalletBalances resource.

**Path parameters:**

- `pspSubWalletId` — PspSubWalletBalances identifier

---

## PspSubWalletStatement

### `GET /api/v1/api/v1/psp_sub_wallet_statements/{id}/pdf`

Retrieves a PspSubWalletStatement resource.

**Path parameters:**

- `id` — PspSubWalletStatement identifier

---

### `GET /api/v1/psp_sub_wallet_statements/{id}`

Retrieves a PspSubWalletStatement resource.

**Path parameters:**

- `id` — PspSubWalletStatement identifier

---

### `GET /api/v1/psp_sub_wallets/{id}/psp_sub_wallet_statements`

Retrieves the collection of PspSubWalletStatement resources.

**Path parameters:**

- `id` — PspSubWalletStatement identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 

---

## PspWallet

### `GET /api/v1/organizations/{organizationId}/psp_wallets`

Retrieves the collection of PspWallet resources.

**Path parameters:**

- `organizationId` — PspWallet identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/psp_wallets`

Creates a PspWallet resource.

**Request body:**

- `pspName` `string` *(required)* — 
- `organization` `string` *(required)* — 
- `person` `string` *(required)* — 
- `jobTitle` `string` — 
- `lastDigitsUsSocialSecurityNumber` `string` — 
- `doingBusinessAs` `string` — 

---

### `GET /api/v1/psp_wallets/{id}`

Retrieves a PspWallet resource.

**Path parameters:**

- `id` — PspWallet identifier

---

### `PUT /api/v1/psp_wallets/{id}`

Replaces the PspWallet resource.

**Path parameters:**

- `id` — PspWallet identifier

**Request body:**

- `person` `string` *(required)* — 
- `jobTitle` `string` — 
- `lastDigitsUsSocialSecurityNumber` `string` — 
- `doingBusinessAs` `string` — 

---

## PspWalletCompliance

### `GET /api/v1/psp_wallet_compliances/{id}`

Retrieves a PspWalletCompliance resource.

**Path parameters:**

- `id` — PspWalletCompliance identifier

---

### `PUT /api/v1/psp_wallet_compliances/{id}/transitions/{transition}`

Replaces the PspWalletCompliance resource.

**Path parameters:**

- `id` — PspWalletCompliance identifier

**Request body:**

- `canPayoutUntil` `string` — 
- `canPayInUntil` `string` — 
- `sepaComplianceStatus` `string` *(required)* — 
- `notifiedOfPeriodicReviewToBeCompleted` `boolean` — 
- `notifiedOfPeriodicReviewIsExpired` `boolean` — 
- `periodicReviewTriggeredAt` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `deletedAt` `string` — Timestamp of the entity's soft deletion
- `clock` `ClockInterface` — 
- `periodicReviewDeadline` `string` — 
- `updatedAt` `string` — 

---

## ReceivedCheck

### `GET /api/v1/organizations/{organizationId}/received_checks`

Retrieves the collection of ReceivedCheck resources.

**Path parameters:**

- `organizationId` — ReceivedCheck identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `checkRemittance` — 
- `checkRemittance[]` — 
- `thirdParty` — 
- `thirdParty[]` — 
- `type` — 
- `type[]` — 
- `transmitterName` — 
- `accountingRecord.entries.name` — 
- `number` — 
- `status` — 
- `status[]` — 
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 
- `checkRemittance.date[before]` — 
- `checkRemittance.date[strictly_before]` — 
- `checkRemittance.date[after]` — 
- `checkRemittance.date[strictly_after]` — 
- `amount[between]` — 
- `amount[gt]` — 
- `amount[gte]` — 
- `amount[lt]` — 
- `amount[lte]` — 
- `exists[rejectedCheck]` — 
- `exists[checkRemittance]` — 
- `order[amount]` — 
- `order[transmitterName]` — 
- `order[number]` — 
- `order[date]` — 

---

### `GET /api/v1/received_checks/{id}`

Retrieves a ReceivedCheck resource.

**Path parameters:**

- `id` — ReceivedCheck identifier

---

## RejectedCheck

### `POST /api/v1/rejected_checks`

Creates a RejectedCheck resource.

**Request body:**

- `receivedCheck` `string` — 
- `date` `AbsoluteDate-RejectedCheck.write` — 

---

### `GET /api/v1/rejected_checks/{id}`

Retrieves a RejectedCheck resource.

**Path parameters:**

- `id` — RejectedCheck identifier

---

