# OpenApiDefinition.CardControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**callDelete**](CardControllerApi.md#callDelete) | **DELETE** /api/cards/{cardId} | 
[**create**](CardControllerApi.md#create) | **POST** /api/cards | 
[**list**](CardControllerApi.md#list) | **GET** /api/cards | 
[**updateStatus**](CardControllerApi.md#updateStatus) | **PATCH** /api/cards/{cardId}/status | 



## callDelete

> callDelete(cardId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.CardControllerApi();
let cardId = 789; // Number | 
apiInstance.callDelete(cardId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## create

> CardResponse create(userId, cardCreateRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.CardControllerApi();
let userId = 789; // Number | 
let cardCreateRequest = new OpenApiDefinition.CardCreateRequest(); // CardCreateRequest | 
apiInstance.create(userId, cardCreateRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 
 **cardCreateRequest** | [**CardCreateRequest**](CardCreateRequest.md)|  | 

### Return type

[**CardResponse**](CardResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## list

> PageCardResponse list(userId, pageable)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.CardControllerApi();
let userId = 789; // Number | 
let pageable = new OpenApiDefinition.Pageable(); // Pageable | 
apiInstance.list(userId, pageable, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 
 **pageable** | [**Pageable**](.md)|  | 

### Return type

[**PageCardResponse**](PageCardResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateStatus

> CardResponse updateStatus(cardId, cardUpdateStatusRequest)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.CardControllerApi();
let cardId = 789; // Number | 
let cardUpdateStatusRequest = new OpenApiDefinition.CardUpdateStatusRequest(); // CardUpdateStatusRequest | 
apiInstance.updateStatus(cardId, cardUpdateStatusRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **Number**|  | 
 **cardUpdateStatusRequest** | [**CardUpdateStatusRequest**](CardUpdateStatusRequest.md)|  | 

### Return type

[**CardResponse**](CardResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

