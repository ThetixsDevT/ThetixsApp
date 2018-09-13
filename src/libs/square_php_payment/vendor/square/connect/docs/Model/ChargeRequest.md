# ChargeRequest

## Properties
Name | Getter | Setter | Type | Description | Notes
------------ | ------------- | ------------- | ------------- | ------------- | -------------
**idempotency_key** | getIdempotencyKey() | setIdempotencyKey($value) | **string** | A value you specify that uniquely identifies this transaction among transactions you&#39;ve created.  If you&#39;re unsure whether a particular transaction succeeded, you can reattempt it with the same idempotency key without worrying about double-charging the buyer.  See [Idempotency keys](#idempotencykeys) for more information. | 
**amount_money** | getAmountMoney() | setAmountMoney($value) | [**\SquareConnect\Model\Money**](Money.md) | The amount of money to charge.  Note that you specify the amount in the __smallest denomination of the applicable currency__. For example, US dollar amounts are specified in cents. See [Working with monetary amounts](#workingwithmonetaryamounts) for details.  The value of &#x60;currency&#x60; must match the currency associated with the business that is charging the card. | 
**card_nonce** | getCardNonce() | setCardNonce($value) | **string** | A nonce generated from the &#x60;SqPaymentForm&#x60; that represents the card to charge.  The application that provides a nonce to this endpoint must be the _same application_ that generated the nonce with the &#x60;SqPaymentForm&#x60;. Otherwise, the nonce is invalid.  Do not provide a value for this field if you provide a value for &#x60;customer_card_id&#x60;. | [optional] 
**customer_card_id** | getCustomerCardId() | setCustomerCardId($value) | **string** | The ID of the customer card on file to charge. Do not provide a value for this field if you provide a value for &#x60;card_nonce&#x60;.  If you provide this value, you _must_ also provide a value for &#x60;customer_id&#x60;. | [optional] 
**delay_capture** | getDelayCapture() | setDelayCapture($value) | **bool** | If &#x60;true&#x60;, the request will only perform an Auth on the provided card. You can then later perform either a Capture (with the [CaptureTransaction](#endpoint-capturetransaction) endpoint) or a Void (with the [VoidTransaction](#endpoint-voidtransaction) endpoint).  Default value: &#x60;false&#x60; | [optional] 
**reference_id** | getReferenceId() | setReferenceId($value) | **string** | An optional ID you can associate with the transaction for your own purposes (such as to associate the transaction with an entity ID in your own database).  This value cannot exceed 40 characters. | [optional] 
**note** | getNote() | setNote($value) | **string** | An optional note to associate with the transaction.  This value cannot exceed 60 characters. | [optional] 
**customer_id** | getCustomerId() | setCustomerId($value) | **string** | The ID of the customer to associate this transaction with. This field is required if you provide a value for &#x60;customer_card_id&#x60;, and optional otherwise. | [optional] 
**billing_address** | getBillingAddress() | setBillingAddress($value) | [**\SquareConnect\Model\Address**](Address.md) | The buyer&#39;s billing address. This value is optional, but this transaction is ineligible for chargeback protection if neither this parameter nor &#x60;shipping_address&#x60; is provided. | [optional] 
**shipping_address** | getShippingAddress() | setShippingAddress($value) | [**\SquareConnect\Model\Address**](Address.md) | The buyer&#39;s shipping address, if available. This value is optional, but this transaction is ineligible for chargeback protection if neither this parameter nor &#x60;billing_address&#x60; is provided. | [optional] 
**buyer_email_address** | getBuyerEmailAddress() | setBuyerEmailAddress($value) | **string** | The buyer&#39;s email address, if available. This value is optional, but this transaction is ineligible for chargeback protection if it is not provided. | [optional] 
**order_id** | getOrderId() | setOrderId($value) | **string** | The ID of the order to associate with this transaction.  If you provide this value, the &#x60;amount_money&#x60; value of your request must __exactly match__ the &#x60;total_money&#x60; value of the order&#39;s &#x60;order_amounts&#x60; field. | [optional] 

Note: All properties are protected and only accessed via getters and setters.

[[Back to Model list]](../../README.md#documentation-for-models) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to README]](../../README.md)
