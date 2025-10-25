# OpenApiDefinition.CardRequestControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**requestCardBlock**](CardRequestControllerApi.md#requestCardBlock) | **POST** /api/card-requests/block/{cardId} | 



## requestCardBlock

> Object requestCardBlock(cardId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.CardRequestControllerApi();
let cardId = 789; // Number | 
apiInstance.requestCardBlock(cardId, (error, data, response) => {
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

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

