# AssoConnect API — Others

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## Apps

### `GET /api/v1/apps/{id}`

Retrieves a Apps resource.

**Path parameters:**

- `id` — Apps identifier

---

### `PUT /api/v1/apps/{id}`

Replaces the Apps resource.

**Path parameters:**

- `id` — Apps identifier

**Request body:**

- `apps` `array` — 

---

### `GET /api/v1/organizations/{id}/apps`

Retrieves a Apps resource.

**Path parameters:**

- `id` — Apps identifier

---

## CreatePlatform

### `POST /api/v1/create_platforms`

Creates a CreatePlatform resource.

**Request body:**

- `nonprofit` `CreatePlatformRequestNonprofitDto` — 
- `admin` `CreatePlatformRequestAdminDto` — 
- `subscription` `CreatePlatformRequestSubscriptionDto` — 
- `networkSlug` `string` — 
- `anonymousId` `string` — 
- `valueProposition` `string` — 
- `address` `` — 

---

## Device

### `GET /api/v1/organizations/{organizationId}/devices`

Retrieves the collection of Device resources.

**Path parameters:**

- `organizationId` — Device identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `search_status` — Filter on DeviceStatus
- `person` — Filter giving ULIDs of Person entities.

---

### `GET /api/v1/security/devices/{id}`

Retrieves a Device resource.

**Path parameters:**

- `id` — Device identifier

---

### `DELETE /api/v1/security/devices/{id}`

Removes the Device resource.

**Path parameters:**

- `id` — Device identifier

---

### `PUT /api/v1/security/devices/{id}/resend`

Replaces the Device resource.

**Path parameters:**

- `id` — Device identifier

**Request body:**

- `status` `string` — 
- `tapToPayRequests` `array` — 
- `organization` `Organization` — 
- `person` `string` — 
- `deviceId` `string` — 
- `deviceName` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `lastActivityDate` `string` — 
- `statusString` `string` — 
- `device` `boolean` — 
- `deletedAt` `string` — 
- `clock` `ClockInterface` — 
- `userIdentifier` `string` — 
- `identifier` `string` — 
- `roles` `array` — 
- `password` `string` — 
- `salt` `string` — 
- `username` `string` — 
- `updatedAt` `string` — 

---

### `PUT /api/v1/security/devices/{id}/transitions/{transition}`

Replaces the Device resource.

**Path parameters:**

- `id` — Device identifier

**Request body:**

- `status` `string` — 
- `tapToPayRequests` `array` — 
- `organization` `Organization` — 
- `person` `string` — 
- `deviceId` `string` — 
- `deviceName` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `lastActivityDate` `string` — 
- `statusString` `string` — 
- `device` `boolean` — 
- `deletedAt` `string` — 
- `clock` `ClockInterface` — 
- `userIdentifier` `string` — 
- `identifier` `string` — 
- `roles` `array` — 
- `password` `string` — 
- `salt` `string` — 
- `username` `string` — 
- `updatedAt` `string` — 

---

## DeviceInvite

### `GET /api/v1/organizations/{organizationId}/device_invites`

Retrieves the collection of DeviceInvite resources.

**Path parameters:**

- `organizationId` — DeviceInvite identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `search_status` — Filter on DevicePairingInviteStatus
- `person` — Filter giving ULIDs of Person entities.

---

### `POST /api/v1/security/device_invites`

Creates a DeviceInvite resource.

**Request body:**

- `status` `string` — 
- `code` `string` — 
- `expiresAt` `string` — 
- `organization` `Organization` — 
- `person` `string` — 
- `device` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `expired` `boolean` — 
- `statusString` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `POST /api/v1/security/device_invites/accept`

Creates a DeviceInvite resource.

**Request body:**

- `deviceId` `string` *(required)* — 
- `deviceName` `string` *(required)* — 
- `inviteCode` `string` *(required)* — 

---

### `GET /api/v1/security/device_invites/{id}`

Retrieves a DeviceInvite resource.

**Path parameters:**

- `id` — DeviceInvite identifier

---

### `DELETE /api/v1/security/device_invites/{id}`

Removes the DeviceInvite resource.

**Path parameters:**

- `id` — DeviceInvite identifier

---

### `PUT /api/v1/security/device_invites/{id}/resend`

Replaces the DeviceInvite resource.

**Path parameters:**

- `id` — DeviceInvite identifier

**Request body:**

- `status` `string` — 
- `code` `string` — 
- `expiresAt` `string` — 
- `organization` `Organization` — 
- `person` `string` — 
- `device` `string` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `expired` `boolean` — 
- `statusString` `string` — 
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

## FeatureFlag

### `GET /api/v1/feature_flags/{id}`

Retrieves a FeatureFlag resource.

**Path parameters:**

- `id` — FeatureFlag identifier

---

### `GET /api/v1/organizations/{organizationId}/feature_flags`

Retrieves the collection of FeatureFlag resources.

**Path parameters:**

- `organizationId` — FeatureFlag identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## FraudManagementNonprofit

### `GET /api/v1/fraud-management/response/nonprofit/{nonprofit}`

Retrieves a FraudManagementNonprofit resource.

**Path parameters:**

- `nonprofit` — FraudManagementNonprofit identifier

---

## Nonprofit

### `GET /api/v1/nonprofits/{id}`

Retrieves a Nonprofit resource.

**Path parameters:**

- `id` — Nonprofit identifier

---

### `PUT /api/v1/nonprofits/{id}`

Replaces the Nonprofit resource.

**Path parameters:**

- `id` — Nonprofit identifier

**Request body:**

- `frenchRna` `string` — 
- `frenchSiren` `string` — 
- `country` `string` *(required)* — Iso 3166-2 Country Code of the Nonprofit
- `currency` `Currency-Nonprofit.update` *(required)* — 
- `locale` `string` *(required)* — Concatenation of language and country
- `timezone` `DateTimeZone-Nonprofit.update` *(required)* — 
- `name` `string` *(required)* — Official name in legal documents

---

### `GET /api/v1/nonprofits/{id}/tax_receipt/sample`

Retrieves a Nonprofit resource.

**Path parameters:**

- `id` — Nonprofit identifier

---

### `GET /api/v1/nonprofits/{id}/url`

Retrieves a Nonprofit resource.

**Path parameters:**

- `id` — Nonprofit identifier

---

### `GET /api/v1/organizations/{organizationId}/nonprofit`

Retrieves a Nonprofit resource.

**Path parameters:**

- `organizationId` — Nonprofit identifier

---

### `GET /api/v1/public/organizations/{organizationId}/nonprofit`

Retrieves a Nonprofit resource.

**Path parameters:**

- `organizationId` — Nonprofit identifier

---

## OAuthClient

### `POST /api/v1/organizations/{id}/oauthClient`

Creates a OAuthClient resource.

**Path parameters:**

- `id` — OAuthClient identifier

**Request body:**

- `email` `string` — 
- `name` `string` *(required)* — OAuthClient's name
- `redirectUri` `string` *(required)* — OAuthClient's redirect uri
The "assoconnect" & "springly" protocols are required for Android apps
- `grantType` `string` — 

---

### `GET /api/v1/organizations/{organizationId}/oauthClient`

Retrieves the collection of OAuthClient resources.

**Path parameters:**

- `organizationId` — OAuthClient identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/organizations/{organizationId}/oauthClient/{id}`

Retrieves a OAuthClient resource.

**Path parameters:**

- `organizationId` — OAuthClient identifier
- `id` — OAuthClient identifier

---

### `DELETE /api/v1/organizations/{organizationId}/oauthClient/{id}`

Removes the OAuthClient resource.

**Path parameters:**

- `organizationId` — OAuthClient identifier
- `id` — OAuthClient identifier

---

## Platform

### `GET /api/v1/platforms/{id}`

Retrieves a Platform resource.

**Path parameters:**

- `id` — Platform identifier

---

## PlatformOrganizationLevel

### `GET /api/v1/organizations/{organizationId}/platform_organization_level`

Retrieves the collection of PlatformOrganizationLevel resources.

**Path parameters:**

- `organizationId` — PlatformOrganizationLevel identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/platform_organization_levels`

Creates a PlatformOrganizationLevel resource.

**Request body:**

- `level` `integer` — 
- `name` `string` — 
- `platform` `string` — The IRI of a Platform resource

---

### `GET /api/v1/platform_organization_levels/{id}`

Retrieves a PlatformOrganizationLevel resource.

**Path parameters:**

- `id` — PlatformOrganizationLevel identifier

---

### `PUT /api/v1/platform_organization_levels/{id}`

Replaces the PlatformOrganizationLevel resource.

**Path parameters:**

- `id` — PlatformOrganizationLevel identifier

**Request body:**

- `name` `string` — 

---

### `DELETE /api/v1/platform_organization_levels/{id}`

Removes the PlatformOrganizationLevel resource.

**Path parameters:**

- `id` — PlatformOrganizationLevel identifier

---

### `GET /api/v1/platforms/{platformId}/platform_organization_levels`

Retrieves the collection of PlatformOrganizationLevel resources.

**Path parameters:**

- `platformId` — PlatformOrganizationLevel identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## PlatformSpecifications

### `GET /api/v1/platforms/{platformId}/platform_specifications`

Retrieves a PlatformSpecifications resource.

**Path parameters:**

- `platformId` — PlatformSpecifications identifier

---

## Psp

### `GET /api/v1/psps/{name}`

Retrieves a Psp resource.

**Path parameters:**

- `name` — Psp identifier

---

## Subscription

### `GET /api/v1/organizations/{id}/subscription`

Retrieves a Subscription resource.

**Path parameters:**

- `id` — Subscription identifier

---

### `GET /api/v1/subscriptions/{id}`

Retrieves a Subscription resource.

**Path parameters:**

- `id` — Subscription identifier

---

## SubscriptionDiscount

### `GET /api/v1/subscription_discounts`

Retrieves the collection of SubscriptionDiscount resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `name` — 
- `startsAt[before]` — 
- `startsAt[strictly_before]` — 
- `startsAt[after]` — 
- `startsAt[strictly_after]` — 
- `endsAt[before]` — 
- `endsAt[strictly_before]` — 
- `endsAt[after]` — 
- `endsAt[strictly_after]` — 
- `category` — 
- `category[]` — 
- `status` — 

---

### `POST /api/v1/subscription_discounts`

Creates a SubscriptionDiscount resource.

**Request body:**

- `name` `string` *(required)* — 
- `description` `string` — 
- `value` `array` — 
- `nbMax` `integer` — 
- `validFor` `integer` — 
- `startsAt` `` — 
- `endsAt` `` — 
- `category` `string` — 
- `network` `string` — 

---

### `GET /api/v1/subscription_discounts/{id}`

Retrieves a SubscriptionDiscount resource.

**Path parameters:**

- `id` — SubscriptionDiscount identifier

---

## SubscriptionDiscountCategory

### `GET /api/v1/subscription_discount_categories`

Retrieves the collection of SubscriptionDiscountCategory resources.

**Query parameters:**

- `pagination` — Enable or disable pagination

---

### `GET /api/v1/subscription_discount_categories/{id}`

Retrieves a SubscriptionDiscountCategory resource.

**Path parameters:**

- `id` — SubscriptionDiscountCategory identifier

---

## SubscriptionDiscountUsage

### `GET /api/v1/organizations/{organizationId}/subscription_discount_usages`

Retrieves the collection of SubscriptionDiscountUsage resources.

**Path parameters:**

- `organizationId` — SubscriptionDiscountUsage identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `DELETE /api/v1/organizations/{organizationId}/subscription_discount_usages/{id}`

Removes the SubscriptionDiscountUsage resource.

**Path parameters:**

- `organizationId` — 
- `id` — SubscriptionDiscountUsage identifier

---

### `GET /api/v1/subscription_discount_usages/{id}`

Retrieves a SubscriptionDiscountUsage resource.

**Path parameters:**

- `id` — SubscriptionDiscountUsage identifier

---

### `GET /api/v1/subscription_discounts/{subscriptionId}/subscription_discount_usages`

Retrieves the collection of SubscriptionDiscountUsage resources.

**Path parameters:**

- `subscriptionId` — SubscriptionDiscountUsage identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## SubscriptionSpecifications

### `GET /api/v1/organizations/{id}/subscription_specifications`

Retrieves a SubscriptionSpecifications resource.

**Path parameters:**

- `id` — SubscriptionSpecifications identifier

---

## ThirdPartyEsKey

### `GET /api/v1/organizations/{id}/thirdparty_es_key`

Retrieves a ThirdPartyEsKey resource.

**Path parameters:**

- `id` — ThirdPartyEsKey identifier

---

