# AssoConnect API — Accounting

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## Account

### `GET /api/v1/nonprofits/{nonprofitId}/chart_of_accounts`

Retrieves the collection of Account resources.

**Path parameters:**

- `nonprofitId` — Account identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `purpose` — 
- `type[]` — 
- `status[]` — 
- `q` — 
- `sub_taxon[]` — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/chart_of_accounts/accounts`

Retrieves the collection of Account resources.

**Path parameters:**

- `nonprofitId` — Account identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `purpose` — 
- `type[]` — 
- `status[]` — 
- `q` — 
- `sub_taxon[]` — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/chart_of_accounts/{account}`

Retrieves a Account resource.

**Path parameters:**

- `nonprofitId` — Account identifier
- `account` — Account identifier

---

### `GET /api/v1/organizations/{organizationId}/accounting_accounts`

Retrieves the collection of Account resources.

**Path parameters:**

- `organizationId` — Account identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `purpose` — 
- `type[]` — 
- `status[]` — 
- `q` — 
- `sub_taxon[]` — 

---

### `GET /api/v1/unified_chart_of_accounts/{country}/accounts`

Retrieves the collection of Account resources.

**Path parameters:**

- `country` — Account identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `type[]` — 
- `status[]` — 
- `q` — 
- `sub_taxon[]` — 

---

## AccountingBreakdown

### `POST /api/v1/accounting_breakdowns`

Creates a AccountingBreakdown resource.

**Request body:**

- `accountingEntry` `string` — AccountingEntry linked to the Breakdown
- `accountingBreakdownSplits` `array` — 

---

### `GET /api/v1/accounting_breakdowns/{id}`

Retrieves a AccountingBreakdown resource.

**Path parameters:**

- `id` — AccountingBreakdown identifier

---

### `PUT /api/v1/accounting_breakdowns/{id}`

Replaces the AccountingBreakdown resource.

**Path parameters:**

- `id` — AccountingBreakdown identifier

**Request body:**

- `accountingBreakdownSplits` `array` — 

---

### `DELETE /api/v1/accounting_breakdowns/{id}`

Removes the AccountingBreakdown resource.

**Path parameters:**

- `id` — AccountingBreakdown identifier

---

### `GET /api/v1/accounting_entries/{id}/accounting_breakdown`

Retrieves a AccountingBreakdown resource.

**Path parameters:**

- `id` — AccountingBreakdown identifier

---

### `GET /api/v1/organizations/{id}/accounting_breakdowns`

Retrieves the collection of AccountingBreakdown resources.

**Path parameters:**

- `id` — AccountingBreakdown identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `accountingYear` — 
- `breakdownSplits.accountingSubBudget` — 
- `group` — 
- `date[before]` — 
- `date[strictly_before]` — 
- `date[after]` — 
- `date[strictly_after]` — 
- `account` — 

---

## AccountingBreakdownSplit

### `GET /api/v1/accounting_breakdown_splits/{id}`

Retrieves a AccountingBreakdownSplit resource.

**Path parameters:**

- `id` — AccountingBreakdownSplit identifier

---

## AccountingBudget

### `POST /api/v1/accounting_budgets`

Creates a AccountingBudget resource.

**Request body:**

- `nonprofit` `string` — 
- `name` `string` *(required)* — 

---

### `GET /api/v1/accounting_budgets/{id}`

Retrieves a AccountingBudget resource.

**Path parameters:**

- `id` — AccountingBudget identifier

---

### `PUT /api/v1/accounting_budgets/{id}`

Replaces the AccountingBudget resource.

**Path parameters:**

- `id` — AccountingBudget identifier

**Request body:**

- `name` `string` *(required)* — 

---

### `DELETE /api/v1/accounting_budgets/{id}`

Removes the AccountingBudget resource.

**Path parameters:**

- `id` — AccountingBudget identifier

---

### `GET /api/v1/nonprofits/{id}/accounting_budgets`

Retrieves the collection of AccountingBudget resources.

**Path parameters:**

- `id` — AccountingBudget identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## AccountingDocument

### `GET /api/v1/organizations/{organizationId}/accounting/documents`

Retrieves the collection of AccountingDocument resources.

**Path parameters:**

- `organizationId` — AccountingDocument identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

## AccountingImport

### `POST /api/v1/accounting_imports`

Creates a AccountingImport resource.

**Request body:**

- `nonprofit` `string` — 
- `api:actions` `string` — 

---

### `GET /api/v1/accounting_imports/{id}`

Retrieves a AccountingImport resource.

**Path parameters:**

- `id` — AccountingImport identifier

---

### `DELETE /api/v1/accounting_imports/{id}`

Removes the AccountingImport resource.

**Path parameters:**

- `id` — AccountingImport identifier

---

### `GET /api/v1/accounting_imports/{id}/actions`

Retrieves a AccountingImport resource.

**Path parameters:**

- `id` — AccountingImport identifier

---

### `GET /api/v1/nonprofits/{nonprofitId}/accounting_imports`

Retrieves the collection of AccountingImport resources.

**Path parameters:**

- `nonprofitId` — AccountingImport identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## AccountingImportRow

### `GET /api/v1/accounting_import_rows/{id}`

Retrieves a AccountingImportRow resource.

**Path parameters:**

- `id` — AccountingImportRow identifier

---

### `GET /api/v1/accounting_imports/{import}/accounting_import_rows`

Retrieves the collection of AccountingImportRow resources.

**Path parameters:**

- `import` — AccountingImportRow identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `account[]` — AccountingImportRow account
- `amount[gt]` — AccountingImportRow amount
- `amount[lt]` — AccountingImportRow amount
- `amount[gte]` — AccountingImportRow amount
- `amount[lte]` — AccountingImportRow amount
- `date` — AccountingImportRow date

---

## AccountingPeriod

### `GET /api/v1/accounting_prepaid_or_deferred/{prepaidOrDeferred}/period`

Retrieves a AccountingPeriod resource.

**Path parameters:**

- `prepaidOrDeferred` — AccountingPeriod identifier

---

## AccountingPrepaidOrDeferredEntry

### `GET /api/v1/accounting_entries/{accountingEntryId}/prepaid_or_deferred_entry`

Retrieves a AccountingPrepaidOrDeferredEntry resource.

**Path parameters:**

- `accountingEntryId` — AccountingPrepaidOrDeferredEntry identifier

---

### `GET /api/v1/accounting_prepaid_or_deferred_entries/{id}`

Retrieves a AccountingPrepaidOrDeferredEntry resource.

**Path parameters:**

- `id` — AccountingPrepaidOrDeferredEntry identifier

---

### `PUT /api/v1/accounting_prepaid_or_deferred_entries/{id}`

Replaces the AccountingPrepaidOrDeferredEntry resource.

**Path parameters:**

- `id` — AccountingPrepaidOrDeferredEntry identifier

**Request body:**

- `amount` `Money-PrepaidOrDeferredEntry.update` — 

---

### `DELETE /api/v1/accounting_prepaid_or_deferred_entries/{id}`

Removes the AccountingPrepaidOrDeferredEntry resource.

**Path parameters:**

- `id` — AccountingPrepaidOrDeferredEntry identifier

---

### `GET /api/v1/organizations/{organizationId}/prepaid_or_deferred_entries`

Retrieves the collection of AccountingPrepaidOrDeferredEntry resources.

**Path parameters:**

- `organizationId` — AccountingPrepaidOrDeferredEntry identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `accrualEntry.name` — 
- `accrualEntry.account` — 
- `accrualEntry.account[]` — 
- `prepaidOrDeferred.type` — 
- `prepaidOrDeferred.type[]` — 
- `accrualEntry.amount[between]` — 
- `accrualEntry.amount[gt]` — 
- `accrualEntry.amount[gte]` — 
- `accrualEntry.amount[lt]` — 
- `accrualEntry.amount[lte]` — 
- `accrualEntry.accountingRecord.date[before]` — 
- `accrualEntry.accountingRecord.date[strictly_before]` — 
- `accrualEntry.accountingRecord.date[after]` — 
- `accrualEntry.accountingRecord.date[strictly_after]` — 
- `accrualEntry.accountingRecord.organization` — 
- `accrualEntry.accountingRecord.organization[]` — 

---

## AccountingSettings

### `POST /api/v1/accounting_settings`

Creates a AccountingSettings resource.

**Request body:**

- `accountingSetUp` `boolean` — Indicates if the accounting is set up or not
- `parentAccess` `boolean` — Allow access to the current Organization's accounting app from its parent
- `analyticsAccounting` `boolean` — Indicates if the breakdown allocation is allowed or not
- `directAllocation` `boolean` — Display the allocation page after each entry creation
- `auxiliaryAccounting` `boolean` — Allow to create a ThirdParty (client / supplier) and links entries to it.
- `voluntaryContribution` `boolean` — Allow to record voluntary contribution (donation, volunteer time, skill-based sponsorship)
- `prepaidDeferred` `boolean` — Allow to record prepaid expense (PCA) or deferred revenue (CCA)
- `automaticPrepaidOrDeferred` `boolean` — 
- `provisionUnbilled` `boolean` — Allow to record Provisions/FNPs
- `vat` `boolean` — Allow to record VAT on entries
- `documents` `boolean` — Allow to see extra document (Ledger / Profit loss / Balance / Statement of Financial position)
- `subsequentPaymentMonitoring` `boolean` — Allow to create CASH_IN_PENDING / CASH_OUT_PENDING entries and records
- `fec` `boolean` — Displays FEC document
- `accrualAccounting` `boolean` — Allow accrual accounting
- `requireEntryDocument` `boolean` — Allow entry document field to be mandatory
- `customNumbering` `boolean` — Allow custom book entries numbers
- `nonprofit` `string` — 

---

### `GET /api/v1/accounting_settings/{id}`

Retrieves a AccountingSettings resource.

**Path parameters:**

- `id` — AccountingSettings identifier

---

### `PUT /api/v1/accounting_settings/{id}`

Replaces the AccountingSettings resource.

**Path parameters:**

- `id` — AccountingSettings identifier

**Request body:**

- `accountingSetUp` `boolean` — Indicates if the accounting is set up or not
- `parentAccess` `boolean` — Allow access to the current Organization's accounting app from its parent
- `analyticsAccounting` `boolean` — Indicates if the breakdown allocation is allowed or not
- `directAllocation` `boolean` — Display the allocation page after each entry creation
- `auxiliaryAccounting` `boolean` — Allow to create a ThirdParty (client / supplier) and links entries to it.
- `voluntaryContribution` `boolean` — Allow to record voluntary contribution (donation, volunteer time, skill-based sponsorship)
- `prepaidDeferred` `boolean` — Allow to record prepaid expense (PCA) or deferred revenue (CCA)
- `automaticPrepaidOrDeferred` `boolean` — 
- `provisionUnbilled` `boolean` — Allow to record Provisions/FNPs
- `vat` `boolean` — Allow to record VAT on entries
- `documents` `boolean` — Allow to see extra document (Ledger / Profit loss / Balance / Statement of Financial position)
- `subsequentPaymentMonitoring` `boolean` — Allow to create CASH_IN_PENDING / CASH_OUT_PENDING entries and records
- `fec` `boolean` — Displays FEC document
- `accrualAccounting` `boolean` — Allow accrual accounting
- `requireEntryDocument` `boolean` — Allow entry document field to be mandatory
- `customNumbering` `boolean` — Allow custom book entries numbers
- `receiveEmailWhenExpenseReportIsReceived` `boolean` — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/accounting_settings`

Retrieves a AccountingSettings resource.

**Path parameters:**

- `nonprofitId` — AccountingSettings identifier

---

## AccountingSpecification

### `GET /api/v1/accounting_specifications/{id}`

Retrieves a AccountingSpecification resource.

**Path parameters:**

- `id` — AccountingSpecification identifier

---

### `GET /api/v1/organizations/{id}/accounting_specification`

Retrieves a AccountingSpecification resource.

**Path parameters:**

- `id` — AccountingSpecification identifier

---

## AccountingSubBudget

### `GET /api/v1/accounting_budgets/{id}/sub_budgets`

Retrieves the collection of AccountingSubBudget resources.

**Path parameters:**

- `id` — AccountingSubBudget identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/accounting_sub_budgets`

Creates a AccountingSubBudget resource.

**Request body:**

- `budget` `string` — 
- `name` `string` *(required)* — 

---

### `GET /api/v1/accounting_sub_budgets/{id}`

Retrieves a AccountingSubBudget resource.

**Path parameters:**

- `id` — AccountingSubBudget identifier

---

### `PUT /api/v1/accounting_sub_budgets/{id}`

Replaces the AccountingSubBudget resource.

**Path parameters:**

- `id` — AccountingSubBudget identifier

**Request body:**

- `budget` `string` — 
- `name` `string` *(required)* — 

---

### `DELETE /api/v1/accounting_sub_budgets/{id}`

Removes the AccountingSubBudget resource.

**Path parameters:**

- `id` — AccountingSubBudget identifier

---

## AccountingThirdParty

### `POST /api/v1/accounting_third_parties`

Creates a AccountingThirdParty resource.

**Request body:**

- `name` `string` *(required)* — 
- `type` `string` — 
- `nonprofit` `string` — 

---

### `GET /api/v1/accounting_third_parties/{id}`

Retrieves a AccountingThirdParty resource.

**Path parameters:**

- `id` — AccountingThirdParty identifier

---

### `PUT /api/v1/accounting_third_parties/{id}`

Replaces the AccountingThirdParty resource.

**Path parameters:**

- `id` — AccountingThirdParty identifier

**Request body:**

- `name` `string` *(required)* — 
- `type` `string` — 

---

### `DELETE /api/v1/accounting_third_parties/{id}`

Removes the AccountingThirdParty resource.

**Path parameters:**

- `id` — AccountingThirdParty identifier

---

### `GET /api/v1/nonprofits/{id}/accounting_third_parties`

Retrieves the collection of AccountingThirdParty resources.

**Path parameters:**

- `id` — AccountingThirdParty identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `type` — 
- `type[]` — 
- `isArchived` — 

---

## AccountingYear

### `POST /api/v1/accounting_years`

Creates a AccountingYear resource.

**Request body:**

- `nonprofit` `string` — 
- `startsAt` `AbsoluteDate-AccountingYear.create` — 
- `endsAt` `AbsoluteDate-AccountingYear.create` — 
- `api:actions` `string` — 

---

### `GET /api/v1/accounting_years/{id}`

Retrieves a AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

---

### `PUT /api/v1/accounting_years/{id}`

Replaces the AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

**Request body:**

- `api:actions` `string` — 

---

### `DELETE /api/v1/accounting_years/{id}`

Removes the AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

---

### `GET /api/v1/accounting_years/{id}/actions`

Retrieves a AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

---

### `POST /api/v1/accounting_years/{id}/actions/{name}`

Creates a AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

**Request body:**

- `nonprofit` `string` — 
- `status` `string` — 
- `closingRequestedBy` `` — 
- `closingAt` `AbsoluteDate` — 
- `checkStatus` `string` — 
- `lastCheckedAt` `string` — 
- `accountingYearChecks` `array` — 
- `forecasts` `array` — 
- `result` `Money` — 
- `financialAppendix` `string` — 
- `startsAt` `AbsoluteDate` — 
- `endsAt` `AbsoluteDate` — 
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `startsAtAsTimestamp` `integer` — 
- `endsAtAsTimestamp` `integer` — 
- `locked` `boolean` — 
- `closingStage` `string` — 
- `periodStage` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 
- `idAsObject` `string` — 
- `api:actions` `string` — 

---

### `PUT /api/v1/accounting_years/{id}/transitions/{transition}`

Replaces the AccountingYear resource.

**Path parameters:**

- `id` — AccountingYear identifier

**Request body:**

- `nonprofit` `string` — 
- `status` `string` — 
- `closingRequestedBy` `` — 
- `closingAt` `AbsoluteDate` — 
- `checkStatus` `string` — 
- `lastCheckedAt` `string` — 
- `accountingYearChecks` `array` — 
- `forecasts` `array` — 
- `result` `Money` — 
- `financialAppendix` `string` — 
- `startsAt` `AbsoluteDate` — 
- `endsAt` `AbsoluteDate` — 
- `id` `string` — Unique ID of the entity
This UUID is based on an non basic codec.
- `createdAt` `string` — Timestamp of the entity's creation
- `startsAtAsTimestamp` `integer` — 
- `endsAtAsTimestamp` `integer` — 
- `locked` `boolean` — 
- `closingStage` `string` — 
- `periodStage` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 
- `idAsObject` `string` — 
- `api:actions` `string` — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/accounting_years`

Retrieves the collection of AccountingYear resources.

**Path parameters:**

- `nonprofitId` — AccountingYear identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

### `GET /api/v1/nonprofits/{nonprofitId}/accounting_years/closing`

Retrieves a AccountingYear resource.

**Path parameters:**

- `nonprofitId` — Nonprofit identifier

---

## AccountingYearCheck

### `GET /api/v1/accounting_year_checks/{id}`

Retrieves a AccountingYearCheck resource.

**Path parameters:**

- `id` — AccountingYearCheck identifier

---

### `GET /api/v1/accounting_year_checks/{id}/childrens`

Retrieves the collection of AccountingYearCheck resources.

**Path parameters:**

- `id` — AccountingYearCheck identifier

**Query parameters:**

- `pagination` — Enable or disable pagination
- `exists[parent]` — 

---

### `PUT /api/v1/accounting_year_checks/{id}/transitions/{transition}`

Replaces the AccountingYearCheck resource.

**Path parameters:**

- `id` — AccountingYearCheck identifier

**Request body:**

- `checked` `boolean` — 
- `parent` `string` — 
- `children` `array` — 
- `accountingYear` `string` — 
- `type` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `status` `string` — 
- `nonprofit` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 
- `api:actions` `string` — 

---

### `GET /api/v1/accounting_years/{accountingYearId}/accounting_year_checks`

Retrieves the collection of AccountingYearCheck resources.

**Path parameters:**

- `accountingYearId` — AccountingYearCheck identifier

**Query parameters:**

- `pagination` — Enable or disable pagination
- `exists[parent]` — 

---

## AccountingYearSpecificationApiDto

### `GET /api/v1/accounting_years/{resource}/specifications`

Retrieves a AccountingYearSpecificationApiDto resource.

**Path parameters:**

- `resource` — AccountingYearSpecificationApiDto identifier

---

## CustomAccount

### `POST /api/v1/custom_accounts`

Creates a CustomAccount resource.

**Request body:**

- `name` `string` — 
- `accountNumber` `AccountNumber` — 
- `nonprofit` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `archivedAt` `string` — 
- `clock` `ClockInterface` — 
- `archived` `boolean` — 
- `updatedAt` `string` — 

---

### `GET /api/v1/custom_accounts/{id}`

Retrieves a CustomAccount resource.

**Path parameters:**

- `id` — CustomAccount identifier

---

### `PUT /api/v1/custom_accounts/{id}`

Replaces the CustomAccount resource.

**Path parameters:**

- `id` — CustomAccount identifier

**Request body:**

- `name` `string` — 
- `accountNumber` `AccountNumber-CustomAccount.update` — 

---

### `DELETE /api/v1/custom_accounts/{id}`

Removes the CustomAccount resource.

**Path parameters:**

- `id` — CustomAccount identifier

---

### `PUT /api/v1/custom_accounts/{id}/transitions/{transition}`

Replaces the CustomAccount resource.

**Path parameters:**

- `id` — CustomAccount identifier

**Request body:**

- `name` `string` — 
- `accountNumber` `AccountNumber` — 
- `nonprofit` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `archivedAt` `string` — 
- `clock` `ClockInterface` — 
- `archived` `boolean` — 
- `updatedAt` `string` — 

---

## Entry

### `GET /api/v1/accounting_entries/{id}`

Retrieves a Entry resource.

**Path parameters:**

- `id` — Entry identifier

---

### `GET /api/v1/organizations/{organization}/accounting_entries`

Retrieves the collection of Entry resources.

**Path parameters:**

- `organization` — Entry identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `account[]` — Entry account
- `amount[gt]` — Entry amount
- `amount[lt]` — Entry amount
- `amount[gte]` — Entry amount
- `amount[lte]` — Entry amount
- `name[]` — Entry name
- `date` — Entry date
- `has_breakdown` — Entry has_breakdown
- `category_type` — Entry category_type
- `has_deferred` — Entry has_deferred
- `updatedAt` — 
- `updatedAt[]` — 
- `account` — 
- `account[]` — 
- `oldAccountingEntryId` — 
- `oldAccountingEntryId[]` — 
- `name` — 
- `name[]` — 
- `type` — 
- `type[]` — 
- `id` — 
- `id[]` — 
- `createdAt` — 
- `createdAt[]` — 
- `amount` — 
- `amount[]` — 
- `currency` — 
- `currency[]` — 
- `updatedAt` — 
- `updatedAt[]` — 
- `account` — 
- `account[]` — 
- `oldAccountingEntryId` — 
- `oldAccountingEntryId[]` — 
- `name` — 
- `name[]` — 
- `type` — 
- `type[]` — 
- `id` — 
- `id[]` — 
- `createdAt` — 
- `createdAt[]` — 
- `amount` — 
- `amount[]` — 
- `currency` — 
- `currency[]` — 
- `budgets` — Entry budgets
- `accountingRecord.ledger` — Entry accountingRecord.ledger
- `accountingRecord.accountingGroup.balanceType` — Entry accountingRecord.accountingGroup.balanceType
- `updatedAt` — 
- `updatedAt[]` — 
- `account` — 
- `account[]` — 
- `oldAccountingEntryId` — 
- `oldAccountingEntryId[]` — 
- `name` — 
- `name[]` — 
- `type` — 
- `type[]` — 
- `id` — 
- `id[]` — 
- `createdAt` — 
- `createdAt[]` — 
- `amount` — 
- `amount[]` — 
- `currency` — 
- `currency[]` — 

---

## FinanceExpenseReport

### `POST /api/v1/finance_expense_reports`

Creates a FinanceExpenseReport resource.

**Request body:**

- `organization` `Organization-ExpenseReport.write` — 
- `person` `string` — 
- `date` `AbsoluteDate-ExpenseReport.write` — 
- `category` `string` — 
- `comment` `string` — 
- `amount` `Money-ExpenseReport.write` — 

---

### `GET /api/v1/finance_expense_reports/{id}`

Retrieves a FinanceExpenseReport resource.

**Path parameters:**

- `id` — FinanceExpenseReport identifier

---

### `PUT /api/v1/finance_expense_reports/{id}`

Replaces the FinanceExpenseReport resource.

**Path parameters:**

- `id` — FinanceExpenseReport identifier

**Request body:**

- `comment` `string` — 

---

### `DELETE /api/v1/finance_expense_reports/{id}`

Removes the FinanceExpenseReport resource.

**Path parameters:**

- `id` — FinanceExpenseReport identifier

---

### `PUT /api/v1/finance_expense_reports/{id}/transitions/{transition}`

Replaces the FinanceExpenseReport resource.

**Path parameters:**

- `id` — FinanceExpenseReport identifier

**Request body:**

- `status` `string` — 
- `refusalReason` `string` — 
- `payment` `string` — 
- `files` `array` — 
- `organization` `Organization` — 
- `person` `string` — 
- `date` `AbsoluteDate` — 
- `category` `string` — 
- `comment` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `accountingExportStatus` `string` — 
- `amount` `Money` — 
- `currency` `Currency` — 
- `archivedAt` `string` — 
- `clock` `ClockInterface` — 
- `exportedToAccounting` `boolean` — 
- `toBeExportedToAccounting` `boolean` — 
- `accountingDate` `` — 
- `exportDate` `` — 
- `archived` `boolean` — 
- `updatedAt` `string` — 

---

### `GET /api/v1/organizations/{id}/finance_expense_reports`

Retrieves the collection of FinanceExpenseReport resources.

**Path parameters:**

- `id` — FinanceExpenseReport identifier

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
- `status` — 
- `status[]` — 
- `category` — 
- `category[]` — 
- `person` — 
- `person[]` — 
- `id` — 
- `id[]` — 
- `isArchived` — 

---

## FinanceExpenseReportFile

### `POST /api/v1/finance_expense_report_files`

Creates a FinanceExpenseReportFile resource.

**Request body:**

- `mediaObject` `string` — 
- `expenseReport` `string` — 
- `extension` `string` — 

---

### `GET /api/v1/finance_expense_report_files/{id}`

Retrieves a FinanceExpenseReportFile resource.

**Path parameters:**

- `id` — FinanceExpenseReportFile identifier

---

### `DELETE /api/v1/finance_expense_report_files/{id}`

Removes the FinanceExpenseReportFile resource.

**Path parameters:**

- `id` — FinanceExpenseReportFile identifier

---

### `GET /api/v1/finance_expense_report_files/{id}/view`

Retrieves a FinanceExpenseReportFile resource.

**Path parameters:**

- `id` — FinanceExpenseReportFile identifier

---

## FinanceExpenseReportPayment

### `POST /api/v1/finance_expense_report_payments`

Creates a FinanceExpenseReportPayment resource.

**Request body:**

- `expenseReport` `string` — 
- `date` `AbsoluteDate-ExpenseReportPayment.write` — 
- `paymentMethod` `` — 

---

### `GET /api/v1/finance_expense_report_payments/{id}`

Retrieves a FinanceExpenseReportPayment resource.

**Path parameters:**

- `id` — FinanceExpenseReportPayment identifier

---

### `PUT /api/v1/finance_expense_report_payments/{id}`

Replaces the FinanceExpenseReportPayment resource.

**Path parameters:**

- `id` — FinanceExpenseReportPayment identifier

---

## FinancialAppendix

### `POST /api/v1/accounting/documents/financial-appendix`

Creates a FinancialAppendix resource.

**Request body:**

- `form` `` — 
- `accountingYear` `string` — 
- `status` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `nonprofit` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `GET /api/v1/accounting/documents/financial-appendix/{id}`

Retrieves a FinancialAppendix resource.

**Path parameters:**

- `id` — FinancialAppendix identifier

---

### `PUT /api/v1/accounting/documents/financial-appendix/{id}`

Replaces the FinancialAppendix resource.

**Path parameters:**

- `id` — FinancialAppendix identifier

**Request body:**

- `form` `` — 
- `accountingYear` `string` — 
- `status` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `nonprofit` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `GET /api/v1/nonprofits/{nonprofit}/accounting/documents/current-financial-appendix`

Retrieves a FinancialAppendix resource.

**Path parameters:**

- `nonprofit` — FinancialAppendix identifier

---

## FinancialAppendixVariables

### `GET /api/v1/accounting/documents/financial-appendix/{financialAppendix}/variables`

Retrieves a FinancialAppendixVariables resource.

**Path parameters:**

- `financialAppendix` — FinancialAppendixVariables identifier

---

## Forecast

### `GET /api/v1/forecasts/{id}`

Retrieves a Forecast resource.

**Path parameters:**

- `id` — Forecast identifier

---

## GeneralLedger

### `GET /api/v1/organizations/{organizationId}/accounting/documents/general_ledger`

Retrieves a GeneralLedger resource.

**Path parameters:**

- `organizationId` — GeneralLedger identifier

**Query parameters:**

- `type` *(required)* — GeneralLedger type
- `accountingYear` *(required)* — GeneralLedger accountingYear
- `accounts` — GeneralLedger accounts
- `date` — GeneralLedger date
- `thirdParty` — GeneralLedger thirdParty
- `balanceType` — GeneralLedger balanceType

---

## GeneralLedgerTotals

### `GET /api/v1/organizations/{organizationId}/accounting/documents/general_ledger/totals`

Retrieves a GeneralLedgerTotals resource.

**Path parameters:**

- `organizationId` — GeneralLedgerTotals identifier

**Query parameters:**

- `type` *(required)* — GeneralLedgerTotals type
- `accountingYear` *(required)* — GeneralLedgerTotals accountingYear
- `accounts` — GeneralLedgerTotals accounts
- `date` — GeneralLedgerTotals date
- `thirdParty` — GeneralLedgerTotals thirdParty

---

## PrepaidOrDeferred

### `GET /api/v1/accounting_prepaid_or_deferred/{id}`

Retrieves a PrepaidOrDeferred resource.

**Path parameters:**

- `id` — PrepaidOrDeferred identifier

---

## UnifiedChartOfAccounts

### `GET /api/v1/unified_chart_of_accounts/{country}`

Retrieves a UnifiedChartOfAccounts resource.

**Path parameters:**

- `country` — UnifiedChartOfAccounts identifier

---

