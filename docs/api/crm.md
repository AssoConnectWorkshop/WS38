# AssoConnect API — Crm

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## Address

### `GET /api/v1/crm/addresses`

Retrieves the collection of Address resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/crm/addresses`

Creates a Address resource.

**Request body:**

- `person` `string` — The IRI of a PersonDTO resource
- `street1` `string` *(required)* — 
- `street2` `string` — 
- `postal` `string` — 
- `city` `string` *(required)* — 
- `administrativeArea1` `string` — 
- `administrativeArea2` `string` — 
- `country` `string` *(required)* — 
- `latitude` `string` — 
- `longitude` `string` — 

---

### `GET /api/v1/crm/addresses/{id}`

Retrieves a Address resource.

**Path parameters:**

- `id` — Address identifier

---

### `PUT /api/v1/crm/addresses/{id}`

Replaces the Address resource.

**Path parameters:**

- `id` — Address identifier

**Request body:**

- `street1` `string` *(required)* — 
- `street2` `string` — 
- `postal` `string` — 
- `city` `string` *(required)* — 
- `administrativeArea1` `string` — 
- `administrativeArea2` `string` — 
- `country` `string` *(required)* — 
- `latitude` `string` — 
- `longitude` `string` — 

---

### `GET /api/v1/crm/people/{id}/address`

Retrieves a Address resource.

**Path parameters:**

- `id` — Address identifier

---

## Contact

### `POST /api/v1/crm/contacts`

Creates a Contact resource.

**Request body:**

- `type` `string` *(required)* — 
- `dateOfBirth` `` — 
- `email` `string` — 
- `landlinePhone` `string` — 
- `mobilePhone` `string` — 
- `postalAddress` `` — 
- `customFields` `object` — 
- `relations` `array` *(required)* — 

---

### `GET /api/v1/crm/contacts/{id}`

Retrieves a Contact resource.

**Path parameters:**

- `id` — Contact identifier

---

### `PUT /api/v1/crm/contacts/{id}`

Replaces the Contact resource.

**Path parameters:**

- `id` — Contact identifier

**Request body:**

- `dateOfBirth` `` — 
- `email` `string` — 
- `landlinePhone` `string` — 
- `mobilePhone` `string` — 
- `postalAddress` `` — 
- `customFields` `object` — 
- `relations` `array` *(required)* — 

---

### `DELETE /api/v1/crm/contacts/{id}`

Removes the Contact resource.

**Path parameters:**

- `id` — Contact identifier

---

### `POST /api/v1/crm/contacts/{id}/merge`

Creates a Contact resource.

**Path parameters:**

- `id` — Contact identifier

**Request body:**

- `secondaryContactIds` `array` — 

---

### `GET /api/v1/organizations/{organizationId}/contacts`

Retrieves the collection of Contact resources.

**Path parameters:**

- `organizationId` — Contact identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `type` — 
- `type[]` — 
- `email` — 
- `relationType` — 
- `membershipDate[on]` — 
- `membershipDate[from]` — 
- `membershipDate[until]` — 

---

## ContactAlgoliaKey

### `GET /api/v1/organizations/{id}/contact_algolia_key`

Retrieves a ContactAlgoliaKey resource.

**Path parameters:**

- `id` — ContactAlgoliaKey identifier

---

## ContactEsKey

### `GET /api/v1/organizations/{id}/contact_es_key`

Retrieves a ContactEsKey resource.

**Path parameters:**

- `id` — ContactEsKey identifier

---

## CrmFeatureSettings

### `GET /api/v1/platforms/{id}/crm_feature_settings`

Retrieves a CrmFeatureSettings resource.

**Path parameters:**

- `id` — CrmFeatureSettings identifier

---

### `PUT /api/v1/platforms/{id}/crm_feature_settings`

Replaces the CrmFeatureSettings resource.

**Path parameters:**

- `id` — CrmFeatureSettings identifier

**Request body:**

- `hideParentContact` `boolean` — Child groups cannot see parent user through autocomplete
- `contactArchivableFromChapterOrSection` `boolean` — 
- `contactDeletableFromChapterOrSection` `boolean` — 
- `strictContactCreationAndUpdateForAdmin` `boolean` — 
- `platform` `string` — 

---

## CrmSpecifications

### `GET /api/v1/organizations/{id}/crm_specifications`

Retrieves the collection of CrmSpecifications resources.

**Path parameters:**

- `id` — CrmSpecifications identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## CustomField

### `GET /api/v1/crm/custom_fields_schema/{id}`

Retrieves a CustomField resource.

**Path parameters:**

- `id` — CustomField identifier

---

### `GET /api/v1/crm/organizations/{id}/custom_fields_schema`

Retrieves the collection of CustomField resources.

**Path parameters:**

- `id` — CustomField identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## I18nSettings

### `GET /api/v1/crm/people/{id}/i18n_settings`

Retrieves a I18nSettings resource.

**Path parameters:**

- `id` — I18nSettings identifier

---

### `PUT /api/v1/crm/people/{id}/i18n_settings`

Replaces the I18nSettings resource.

**Path parameters:**

- `id` — I18nSettings identifier

**Request body:**

- `locale` `string` — 

---

## IndependentSettings

### `GET /api/v1/crm/independent_settings/{organizationId}`

Retrieves a IndependentSettings resource.

**Path parameters:**

- `organizationId` — IndependentSettings identifier

---

### `PUT /api/v1/crm/independent_settings/{organizationId}`

Replaces the IndependentSettings resource.

**Path parameters:**

- `organizationId` — IndependentSettings identifier

**Request body:**

- `organizationId` `string` — 
- `primaryKey` `string` — 

---

### `GET /api/v1/crm/public/independent_settings/{organizationId}`

Retrieves a IndependentSettings resource.

**Path parameters:**

- `organizationId` — IndependentSettings identifier

---

## Network

### `GET /api/v1/networks`

Retrieves the collection of Network resources.

**Query parameters:**

- `pagination` — Enable or disable pagination

---

### `GET /api/v1/networks/{id}`

Retrieves a Network resource.

**Path parameters:**

- `id` — Network identifier

---

## NetworkAffiliation

### `GET /api/v1/network_affiliations/{id}`

Retrieves a NetworkAffiliation resource.

**Path parameters:**

- `id` — NetworkAffiliation identifier

---

### `GET /api/v1/networks/{networkId}/affiliations`

Retrieves the collection of NetworkAffiliation resources.

**Path parameters:**

- `networkId` — NetworkAffiliation identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

## Organization

### `GET /api/v1/organizations/{id}`

Retrieves a Organization resource.

**Path parameters:**

- `id` — Organization identifier

---

### `DELETE /api/v1/organizations/{id}`

Removes the Organization resource.

**Path parameters:**

- `id` — Organization identifier

---

### `GET /api/v1/organizations/{organizationId}/groups`

Retrieves the collection of Organization resources.

**Path parameters:**

- `organizationId` — Organization identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `isAdvanced` — 
- `isLegalParent` — 
- `nonprofit.platform` — 
- `name` — 
- `type` — 
- `type[]` — 
- `order[name]` — Order by 'name' (asc|desc)

---

### `GET /api/v1/organizations/{organizationId}/groups_detailed`

Retrieves the collection of Organization resources.

**Path parameters:**

- `organizationId` — Organization identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `isAdvanced` — 
- `isLegalParent` — 
- `nonprofit.platform` — 
- `name` — 
- `type` — 
- `type[]` — 
- `order[name]` — Order by 'name' (asc|desc)

---

### `GET /api/v1/platforms/{platformId}/organizations`

Retrieves the collection of Organization resources.

**Path parameters:**

- `platformId` — Organization identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `isAdvanced` — 
- `isLegalParent` — 
- `nonprofit.platform` — 
- `name` — 
- `type` — 
- `type[]` — 
- `order[name]` — Order by 'name' (asc|desc)

---

### `GET /api/v1/public/organizations/{id}`

Retrieves a Organization resource.

**Path parameters:**

- `id` — Organization identifier

---

## OrganizationAddress

### `POST /api/v1/organization_addresses`

Creates a OrganizationAddress resource.

**Request body:**

- `street1` `string` — 
- `street2` `string` — 
- `postal` `string` — 
- `city` `string` — 
- `administrativeArea1` `string` — 
- `administrativeArea2` `string` — 
- `country` `string` *(required)* — 
- `organization` `string` — 

---

### `GET /api/v1/organization_addresses/{id}`

Retrieves a OrganizationAddress resource.

**Path parameters:**

- `id` — OrganizationAddress identifier

---

### `PUT /api/v1/organization_addresses/{id}`

Replaces the OrganizationAddress resource.

**Path parameters:**

- `id` — OrganizationAddress identifier

**Request body:**

- `street1` `string` — 
- `street2` `string` — 
- `postal` `string` — 
- `city` `string` — 
- `administrativeArea1` `string` — 
- `administrativeArea2` `string` — 
- `country` `string` *(required)* — 

---

### `GET /api/v1/organizations/{id}/address`

Retrieves the collection of OrganizationAddress resources.

**Path parameters:**

- `id` — OrganizationAddress identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## OrganizationApiKey

### `GET /api/v1/organizations/{id}/api_keys`

Retrieves the collection of OrganizationApiKey resources.

**Path parameters:**

- `id` — OrganizationApiKey identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/organizations/{id}/api_keys`

Creates a OrganizationApiKey resource.

**Path parameters:**

- `id` — OrganizationApiKey identifier

**Request body:**

- `email` `string` — 

---

### `GET /api/v1/organizations/{organizationId}/api_keys/{id}`

Retrieves a OrganizationApiKey resource.

**Path parameters:**

- `organizationId` — OrganizationApiKey identifier
- `id` — OrganizationApiKey identifier

---

### `DELETE /api/v1/organizations/{organizationId}/api_keys/{id}`

Removes the OrganizationApiKey resource.

**Path parameters:**

- `organizationId` — OrganizationApiKey identifier
- `id` — OrganizationApiKey identifier

---

## OrganizationSpecifications

### `GET /api/v1/organizations/{id}/specifications`

Retrieves the collection of OrganizationSpecifications resources.

**Path parameters:**

- `id` — OrganizationSpecifications identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## Person

### `GET /api/v1/crm/people/{id}`

Retrieves a Person resource.

**Path parameters:**

- `id` — Person identifier

---

### `PUT /api/v1/crm/people/{id}`

Replaces the Person resource.

**Path parameters:**

- `id` — Person identifier

**Request body:**

- `dateOfBirth` `` — 
- `firstName` `string` — 
- `lastName` `string` — 
- `contactId` `string` — 

---

## PrimaryKeyDuplicate

### `GET /api/v1/crm/primary_key_duplicates/{organizationId}`

Retrieves a PrimaryKeyDuplicate resource.

**Path parameters:**

- `organizationId` — PrimaryKeyDuplicate identifier

**Query parameters:**

- `key` *(required)* — 

---

## StatsCrm

### `GET /api/v1/organizations/{id}/stats_crm`

Retrieves a StatsCrm resource.

**Path parameters:**

- `id` — StatsCrm identifier

---

## StructureBelongingPerson

### `POST /api/v1/crm/structure_belonging_people`

Creates a StructureBelongingPerson resource.

**Request body:**

- `structure` `Structure` *(required)* — 
- `person` `string` *(required)* — 
- `createdBy` `User` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `organization` `Organization` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `PUT /api/v1/crm/structure_belonging_people/{id}`

Replaces the StructureBelongingPerson resource.

**Path parameters:**

- `id` — StructureBelongingPerson identifier

**Request body:**

- `structure` `Structure` *(required)* — 
- `person` `string` *(required)* — 
- `createdBy` `User` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `organization` `Organization` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `DELETE /api/v1/crm/structure_belonging_people/{id}`

Removes the StructureBelongingPerson resource.

**Path parameters:**

- `id` — StructureBelongingPerson identifier

---

## Timeline

### `GET /api/v1/timelines/{id}`

Retrieves a Timeline resource.

**Path parameters:**

- `id` — Timeline identifier

---

## UserOrganizationRole

### `GET /api/v1/crm/people/{personId}/user_organization_roles`

Retrieves the collection of UserOrganizationRole resources.

**Path parameters:**

- `personId` — UserOrganizationRole identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/user_organization_roles/{id}`

Retrieves a UserOrganizationRole resource.

**Path parameters:**

- `id` — UserOrganizationRole identifier

---

## Webhook

### `POST /api/v1/crm/webhooks`

Creates a Webhook resource.

**Request body:**

- `groups` `array` — 
- `name` `string` — 
- `url` `string` — 
- `organization` `Organization-CrmWebhook.create` — 

---

### `GET /api/v1/crm/webhooks/{id}`

Retrieves a Webhook resource.

**Path parameters:**

- `id` — Webhook identifier

---

### `PUT /api/v1/crm/webhooks/{id}`

Replaces the Webhook resource.

**Path parameters:**

- `id` — Webhook identifier

**Request body:**

- `status` `string` — 
- `groups` `array` — 
- `name` `string` — 
- `url` `string` — 
- `organization` `Organization-CrmWebhook.update` — 

---

### `DELETE /api/v1/crm/webhooks/{id}`

Removes the Webhook resource.

**Path parameters:**

- `id` — Webhook identifier

---

### `GET /api/v1/organizations/{organizationId}/webhooks`

Retrieves the collection of Webhook resources.

**Path parameters:**

- `organizationId` — Webhook identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## WebhookLog

### `GET /api/v1/crm/webhook_logs/{id}`

Retrieves a WebhookLog resource.

**Path parameters:**

- `id` — WebhookLog identifier

---

### `GET /api/v1/crm/webhooks/{webhookId}/webhook_logs`

Retrieves the collection of WebhookLog resources.

**Path parameters:**

- `webhookId` — WebhookLog identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

