# AssoConnect API — Emailing

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## AdminNotification

### `GET /api/v1/settings/admin_notifications`

Retrieves the collection of AdminNotification resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `POST /api/v1/settings/admin_notifications`

Creates a AdminNotification resource.

**Request body:**

- `type` `string` — 
- `brand` `string` — 
- `locale` `string` *(required)* — 
- `title` `string` *(required)* — 
- `subtitle` `string` — 
- `shortDescription` `string` *(required)* — 
- `longDescription` `string` — 
- `ctaText` `string` — 
- `ctaUrl` `string` — 
- `image` `string` — 
- `video` `string` — 
- `targetedPage` `string` — 
- `roles` `array` — Reachables roles for this notification
- `plans` `array` — Target specific subscription plans for this notification
- `isNetwork` `boolean` — Target only network platforms (true), non-network platforms (false), or all platforms (null)
- `startsAt` `` — 
- `endsAt` `` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `GET /api/v1/settings/admin_notifications/{id}`

Retrieves a AdminNotification resource.

**Path parameters:**

- `id` — AdminNotification identifier

---

### `PUT /api/v1/settings/admin_notifications/{id}`

Replaces the AdminNotification resource.

**Path parameters:**

- `id` — AdminNotification identifier

**Request body:**

- `type` `string` — 
- `brand` `string` — 
- `locale` `string` *(required)* — 
- `title` `string` *(required)* — 
- `subtitle` `string` — 
- `shortDescription` `string` *(required)* — 
- `longDescription` `string` — 
- `ctaText` `string` — 
- `ctaUrl` `string` — 
- `image` `string` — 
- `video` `string` — 
- `targetedPage` `string` — 
- `roles` `array` — Reachables roles for this notification
- `plans` `array` — Target specific subscription plans for this notification
- `isNetwork` `boolean` — Target only network platforms (true), non-network platforms (false), or all platforms (null)
- `startsAt` `` — 
- `endsAt` `` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `DELETE /api/v1/settings/admin_notifications/{id}`

Removes the AdminNotification resource.

**Path parameters:**

- `id` — AdminNotification identifier

---

## EmailCampaign

### `GET /api/v1/communication/email_campaigns/{id}`

Retrieves a EmailCampaign resource.

**Path parameters:**

- `id` — EmailCampaign identifier

---

### `POST /api/v1/communication/email_campaigns/{id}/export`

Creates a EmailCampaign resource.

**Path parameters:**

- `id` — EmailCampaign identifier

**Request body:**

- `emailType` `string` — 

---

### `POST /api/v1/communication/email_campaigns/{id}/model`

Creates a EmailCampaign resource.

**Path parameters:**

- `id` — EmailCampaign identifier

**Request body:**

- `sendingSystem` `string` — 
- `externalId` `string` — 
- `organization` `Organization` — 
- `subject` `string` — 
- `status` `string` — 
- `fraudStatus` `string` — 
- `nbUnverifiedEmailsSent` `integer` — 
- `nbTotalEmailsSent` `integer` — 
- `startDateLastBatch` `string` — 
- `scheduledAt` `string` — 
- `completelySentAt` `string` — 
- `template` `` — 
- `lists` `array` — 
- `communityLists` `array` — 
- `events` `array` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

### `PUT /api/v1/communication/email_campaigns/{id}/transitions/{transition}`

Replaces the EmailCampaign resource.

**Path parameters:**

- `id` — EmailCampaign identifier

---

### `POST /api/v1/communication/email_campaigns/{id}/unblock`

Creates a EmailCampaign resource.

**Path parameters:**

- `id` — EmailCampaign identifier

**Request body:**

- `sendingSystem` `string` — 
- `externalId` `string` — 
- `organization` `Organization` — 
- `subject` `string` — 
- `status` `string` — 
- `fraudStatus` `string` — 
- `nbUnverifiedEmailsSent` `integer` — 
- `nbTotalEmailsSent` `integer` — 
- `startDateLastBatch` `string` — 
- `scheduledAt` `string` — 
- `completelySentAt` `string` — 
- `template` `` — 
- `lists` `array` — 
- `communityLists` `array` — 
- `events` `array` — 
- `id` `string` — Unique ID of the entity
- `createdAt` `string` — Timestamp of the entity's creation
- `updatedAt` `string` — 
- `clock` `ClockInterface` — 

---

## EmailCampaignApiDto

### `GET /api/v1/organizations/{organizationId}/communication/email_campaigns`

Retrieves the collection of EmailCampaignApiDto resources.

**Path parameters:**

- `organizationId` — EmailCampaignApiDto identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `organization` — 
- `subject` — 
- `status` — 
- `status[]` — 

---

## EmailCampaignMessage

### `GET /api/v1/communication/email_campaign_messages/{id}`

Retrieves a EmailCampaignMessage resource.

**Path parameters:**

- `id` — EmailCampaignMessage identifier

---

## EmailCampaignMessageApiDto

### `GET /api/v1/communication/email_campaigns/{emailCampaignId}/blocked_messages`

Retrieves the collection of EmailCampaignMessageApiDto resources.

**Path parameters:**

- `emailCampaignId` — EmailCampaignMessageApiDto identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `email` — 
- `status` — 
- `status[]` — 
- `lastActivity[before]` — 
- `lastActivity[strictly_before]` — 
- `lastActivity[after]` — 
- `lastActivity[strictly_after]` — 

---

### `GET /api/v1/communication/email_campaigns/{emailCampaignId}/messages`

Retrieves the collection of EmailCampaignMessageApiDto resources.

**Path parameters:**

- `emailCampaignId` — EmailCampaignMessageApiDto identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `email` — 
- `status` — 
- `status[]` — 
- `lastActivity[before]` — 
- `lastActivity[strictly_before]` — 
- `lastActivity[after]` — 
- `lastActivity[strictly_after]` — 

---

## EmailingApp

### `POST /api/v1/communication/app_emailing/{id}/block`

Creates a EmailingApp resource.

**Path parameters:**

- `id` — EmailingApp identifier

**Request body:**

- `locked` `boolean` — True if the emailing service is suspended in case of abuse (too many spams or hard bounces)
- `quota` `integer` — How many emails can be sent every 6 hours
- `trustLevel` `string` — 

---

### `POST /api/v1/communication/app_emailing/{id}/unblock`

Creates a EmailingApp resource.

**Path parameters:**

- `id` — EmailingApp identifier

**Request body:**

- `locked` `boolean` — True if the emailing service is suspended in case of abuse (too many spams or hard bounces)
- `quota` `integer` — How many emails can be sent every 6 hours
- `trustLevel` `string` — 

---

### `PUT /api/v1/communication/emailing_apps/{id}`

Replaces the EmailingApp resource.

**Path parameters:**

- `id` — EmailingApp identifier

**Request body:**

- `locked` `boolean` — True if the emailing service is suspended in case of abuse (too many spams or hard bounces)
- `quota` `integer` — How many emails can be sent every 6 hours
- `trustLevel` `string` — 

---

### `GET /api/v1/organizations/{organizationId}/communication/emailing_app`

Retrieves a EmailingApp resource.

**Path parameters:**

- `organizationId` — EmailingApp identifier

---

## EmailingSpecifications

### `GET /api/v1/organizations/{organizationId}/emailing_specifications`

Retrieves a EmailingSpecifications resource.

**Path parameters:**

- `organizationId` — EmailingSpecifications identifier

---

## NotificationSpecifications

### `GET /api/v1/notification_specifications`

Retrieves the collection of NotificationSpecifications resources.

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/notification_specifications/{id}`

Retrieves a NotificationSpecifications resource.

**Path parameters:**

- `id` — NotificationSpecifications identifier

---

### `GET /api/v1/organizations/{id}/notification_specifications`

Retrieves a NotificationSpecifications resource.

**Path parameters:**

- `id` — NotificationSpecifications identifier

---

