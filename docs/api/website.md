# AssoConnect API — Website

Base URL: `https://app.assoconnect.com/api/v1`  
Auth: `X-AUTH-TOKEN: <your_key>` header  
Accept: `application/ld+json`

---

## AdditionalRequest

### `GET /api/v1/additional_requests/{id}`

Retrieves a AdditionalRequest resource.

**Path parameters:**

- `id` — AdditionalRequest identifier

---

### `GET /api/v1/collects/{collectId}/additional_requests`

Retrieves the collection of AdditionalRequest resources.

**Path parameters:**

- `collectId` — AdditionalRequest identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `collectItemGroup` — 
- `collectItemGroup[]` — 
- `exists[collectItemGroup]` — 

---

### `GET /api/v1/public/collects/{collectId}/additional_requests`

Retrieves the collection of AdditionalRequest resources.

**Path parameters:**

- `collectId` — AdditionalRequest identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `collectItemGroup` — 
- `collectItemGroup[]` — 
- `exists[collectItemGroup]` — 

---

## AnalyticsPage

### `GET /api/v1/organizations/{id}/analytics_pages`

Retrieves the collection of AnalyticsPage resources.

**Path parameters:**

- `id` — AnalyticsPage identifier

**Query parameters:**

- `pagination` — Enable or disable pagination

---

## Collect

### `GET /api/v1/collects/{id}`

Retrieves a Collect resource.

**Path parameters:**

- `id` — Collect identifier

---

### `GET /api/v1/organizations/{organizationId}/collects`

Retrieves the collection of Collect resources.

**Path parameters:**

- `organizationId` — Collect identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `name` — 
- `status` — 
- `status[]` — 
- `websitePageId` — 
- `websitePageId[]` — 
- `contactType` — 
- `contactType[]` — 
- `createdAt[before]` — 
- `createdAt[strictly_before]` — 
- `createdAt[after]` — 
- `createdAt[strictly_after]` — 
- `type` — 
- `order[createdAt]` — 
- `order[bookingStartsAt]` — 
- `order` — Order by a specific property
- `exists[websitePageId]` — 

---

### `GET /api/v1/public/collects/{id}`

Retrieves a Collect resource.

**Path parameters:**

- `id` — Collect identifier

---

## CollectCrmNativeFieldsConfiguration

### `GET /api/v1/collect_crm_native_fields_configurations/{id}`

Retrieves a CollectCrmNativeFieldsConfiguration resource.

**Path parameters:**

- `id` — CollectCrmNativeFieldsConfiguration identifier

---

### `GET /api/v1/collects/{collectId}/collect_crm_native_fields_configuration`

Retrieves a CollectCrmNativeFieldsConfiguration resource.

**Path parameters:**

- `collectId` — CollectCrmNativeFieldsConfiguration identifier

---

### `GET /api/v1/public/collects/{collectId}/collect_crm_native_fields_configuration`

Retrieves a CollectCrmNativeFieldsConfiguration resource.

**Path parameters:**

- `collectId` — CollectCrmNativeFieldsConfiguration identifier

---

## CollectCustomFieldConfiguration

### `GET /api/v1/collect_custom_field_configurations/{collectId}`

Retrieves a CollectCustomFieldConfiguration resource.

**Path parameters:**

- `collectId` — CollectCustomFieldConfiguration identifier

---

### `GET /api/v1/collects/{collectId}/custom_field_configuration`

Retrieves the collection of CollectCustomFieldConfiguration resources.

**Path parameters:**

- `collectId` — CollectCustomFieldConfiguration identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/public/collects/{collectId}/custom_field_configuration`

Retrieves the collection of CollectCustomFieldConfiguration resources.

**Path parameters:**

- `collectId` — CollectCustomFieldConfiguration identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## CollectExtraData

### `GET /api/v1/collects/{collectId}/extra_data`

Retrieves the collection of CollectExtraData resources.

**Path parameters:**

- `collectId` — CollectExtraData identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/public/collects/{collectId}/extra_data`

Retrieves the collection of CollectExtraData resources.

**Path parameters:**

- `collectId` — CollectExtraData identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## CollectFeatureSettings

### `GET /api/v1/collect/collect_feature_settings/{id}`

Retrieves a CollectFeatureSettings resource.

**Path parameters:**

- `id` — CollectFeatureSettings identifier

---

### `PUT /api/v1/collect/collect_feature_settings/{id}`

Replaces the CollectFeatureSettings resource.

**Path parameters:**

- `id` — CollectFeatureSettings identifier

**Request body:**

- `enableMandatoryFieldsForAdmin` `boolean` — Allow the usage of “Mandatory fields for administrators” feature
- `enableQuotaRegistrationByContact` `boolean` — Allow the usage of “Fixer une quantité maximale qu’un utilisateur peut acheter” feature
- `enableQuotaRegistrationOnCollect` `boolean` — Allow the usage of “Limiter le nombre de participants sur l'ensemble des ventes” feature
- `enableQuotaByItem` `boolean` — Allow the usage of “Limiter le nombre de participants sur un tarif donné” feature
- `enableAutomatedGroupAffiliation` `boolean` — Allow the usage of “Ajouter l’utilisateur à un groupe suite à l’ajout d’un tarif donné”
- `enableAccountingAccountCustomizationOnItems` `boolean` — Allow the usage of “Lier à une catégorie comptable donnée”
- `enableDiscountSystem` `boolean` — Allow the creation if discount
- `enableDisplayListOfRegistrants` `boolean` — Allow the usage of “Rendre public le listing des participants” feature
- `enableRestrictionItemsAccessOnEventCollects` `boolean` — Allow the usage of “Limiter à certaines personnes” feature
- `enableConfirmationPageRedirect` `boolean` — Allow the usage of “Deal - Poursuite / Redirection après un achat”
- `enableSepaForNonPro` `boolean` — 
- `recurringOfferedOnlinePaymentMethod` `string` — 
- `oneTimeOfferedOnlinePaymentMethod` `string` — 
- `enableSendConfirmationEmailByDefault` `boolean` — Allow sending confirmation email by default when an admin registers someone
- `enableMembershipWithRenewal` `boolean` — 
- `enableLifetimeMembership` `boolean` — 
- `enableMembershipCard` `boolean` — 

---

### `GET /api/v1/organizations/{organizationId}/collects_settings`

Retrieves a CollectFeatureSettings resource.

**Path parameters:**

- `organizationId` — CollectFeatureSettings identifier

---

## CollectFileUpload

### `POST /api/v1/collect_file_uploads`

Creates a CollectFileUpload resource.

**Request body:**

- `mediaObject` `string` — 
- `fileAdditionalRequest` `string` — 

---

## CollectItemGroup

### `GET /api/v1/collect_item_groups/{id}`

Retrieves a CollectItemGroup resource.

**Path parameters:**

- `id` — CollectItemGroup identifier

---

### `GET /api/v1/collects/{collectId}/collect_item_groups`

Retrieves the collection of CollectItemGroup resources.

**Path parameters:**

- `collectId` — CollectItemGroup identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

### `GET /api/v1/public/collects/{collectId}/collect_item_groups`

Retrieves the collection of CollectItemGroup resources.

**Path parameters:**

- `collectId` — CollectItemGroup identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination

---

## CollectSpecifications

### `GET /api/v1/collect_specifications/{id}`

Retrieves a CollectSpecifications resource.

**Path parameters:**

- `id` — CollectSpecifications identifier

---

### `GET /api/v1/organizations/{id}/collect_specifications`

Retrieves a CollectSpecifications resource.

**Path parameters:**

- `id` — CollectSpecifications identifier

---

## DonationCollect

### `GET /api/v1/donation_collects/{id}`

Retrieves a DonationCollect resource.

**Path parameters:**

- `id` — DonationCollect identifier

---

## EventCollect

### `GET /api/v1/event_collects/{id}`

Retrieves a EventCollect resource.

**Path parameters:**

- `id` — EventCollect identifier

---

## FileAdditionalRequest

### `GET /api/v1/file_additional_requests/{id}`

Retrieves a FileAdditionalRequest resource.

**Path parameters:**

- `id` — FileAdditionalRequest identifier

---

## MediaObject

### `POST /api/v1/media_objects`

Creates a MediaObject resource.

**Request body:**

- `contentMd5` `string` — 
- `organization` `Organization-MediaObject.write` — 
- `type` `string` — 
- `mimeType` `string` — 

---

### `GET /api/v1/media_objects/{id}`

Retrieves a MediaObject resource.

**Path parameters:**

- `id` — MediaObject identifier

---

## MembershipCollect

### `GET /api/v1/membership_collects/{id}`

Retrieves a MembershipCollect resource.

**Path parameters:**

- `id` — MembershipCollect identifier

---

## MembershipFunnel

### `POST /api/v1/membership_funnels/step_pricing_plan_choice`

Creates a MembershipFunnel resource.

**Request body:**

- `collect` `string` *(required)* — 
- `membershipPricingPlanSelections` `array` *(required)* — 

---

### `GET /api/v1/membership_funnels/{id}`

Retrieves a MembershipFunnel resource.

**Path parameters:**

- `id` — MembershipFunnel identifier

---

### `GET /api/v1/membership_funnels/{id}/registrants/{registrantNumber}`

Retrieves a MembershipFunnel resource.

**Path parameters:**

- `id` — MembershipFunnel identifier
- `registrantNumber` — MembershipFunnel identifier

---

### `PATCH /api/v1/membership_funnels/{id}/registrants/{registrantNumber}`

Updates the MembershipFunnel resource.

**Path parameters:**

- `id` — MembershipFunnel identifier
- `registrantNumber` — MembershipFunnel identifier

**Request body:**

- `firstName` `string` — 
- `lastName` `string` — 
- `email` `string` — 
- `dateOfBirth` `string` — 
- `gender` `string` — 
- `phoneLandline` `string` — 
- `phoneMobile` `string` — 
- `pictureId` `string` — 
- `isBuyer` `boolean` — 
- `otherPricingPlanSelections` `array` — 
- `additionalRequestSelections` `array` — 
- `address` `` — 
- `customFields` `array` — 

---

### `PATCH /api/v1/membership_funnels/{id}/step_confirmation`

Updates the MembershipFunnel resource.

**Path parameters:**

- `id` — MembershipFunnel identifier

**Request body:**

- `chosenPaymentMethod` `string` — 
- `email` `string` — 
- `buyer` `ContactDto` — 
- `billingCompanyName` `string` — 
- `billingSiren` `string` — 
- `billingLegalForm` `string` — 

---

## Menu

### `GET /api/v1/menus/{id}`

Retrieves a Menu resource.

**Path parameters:**

- `id` — Menu identifier

**Query parameters:**

- `organizationId` *(required)* — 

---

## NonprofitMarketingTracking

### `GET /api/v1/nonprofit_marketing_trackings/{id}`

Retrieves a NonprofitMarketingTracking resource.

**Path parameters:**

- `id` — NonprofitMarketingTracking identifier

---

### `PUT /api/v1/nonprofit_marketing_trackings/{id}`

Replaces the NonprofitMarketingTracking resource.

**Path parameters:**

- `id` — NonprofitMarketingTracking identifier

**Request body:**

- `initialNeeds` `string` — Main need initially chosen by nonprofit while registering. If multiple needs, should be separated by ","
- `estimatedSize` `string` — 

---

### `POST /api/v1/nonprofit_marketing_trackings/{id}/book_demo`

Creates a NonprofitMarketingTracking resource.

**Path parameters:**

- `id` — NonprofitMarketingTracking identifier

**Request body:**

- `eventUri` `string` *(required)* — 

---

### `GET /api/v1/nonprofits/{nonprofitId}/marketing_tracking`

Retrieves a NonprofitMarketingTracking resource.

**Path parameters:**

- `nonprofitId` — NonprofitMarketingTracking identifier

---

## PricingPlan

### `GET /api/v1/collects/{collectId}/pricing_plans`

Retrieves the collection of PricingPlan resources.

**Path parameters:**

- `collectId` — PricingPlan identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `type[]` — 
- `collectItemGroup` — 
- `collectItemGroup[]` — 
- `exists[collectItemGroup]` — 

---

### `GET /api/v1/pricing_plans/{id}`

Retrieves a PricingPlan resource.

**Path parameters:**

- `id` — PricingPlan identifier

---

### `GET /api/v1/public/collects/{collectId}/pricing_plans`

Retrieves the collection of PricingPlan resources.

**Path parameters:**

- `collectId` — PricingPlan identifier

**Query parameters:**

- `page` — The collection page number
- `itemsPerPage` — The number of items per page
- `pagination` — Enable or disable pagination
- `type[]` — 
- `collectItemGroup` — 
- `collectItemGroup[]` — 
- `exists[collectItemGroup]` — 

---

## ProductCollect

### `GET /api/v1/product_collects/{id}`

Retrieves a ProductCollect resource.

**Path parameters:**

- `id` — ProductCollect identifier

---

