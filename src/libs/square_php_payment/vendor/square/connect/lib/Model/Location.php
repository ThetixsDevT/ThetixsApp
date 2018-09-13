<?php
/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace SquareConnect\Model;

use \ArrayAccess;
/**
 * Location Class Doc Comment
 *
 * @category Class
 * @package  SquareConnect
 * @author   Square Inc.
 * @license  http://www.apache.org/licenses/LICENSE-2.0 Apache License v2
 * @link     https://squareup.com/developers
 */
class Location implements ArrayAccess
{
    /**
      * Array of property to type mappings. Used for (de)serialization 
      * @var string[]
      */
    static $swaggerTypes = array(
        'id' => 'string',
        'name' => 'string',
        'address' => '\SquareConnect\Model\Address',
        'timezone' => 'string',
        'capabilities' => 'string[]',
        'status' => 'string',
        'created_at' => 'string',
        'merchant_id' => 'string',
        'country' => 'string',
        'language_code' => 'string',
        'currency' => 'string',
        'phone_number' => 'string',
        'business_name' => 'string'
    );
  
    /** 
      * Array of attributes where the key is the local name, and the value is the original name
      * @var string[] 
      */
    static $attributeMap = array(
        'id' => 'id',
        'name' => 'name',
        'address' => 'address',
        'timezone' => 'timezone',
        'capabilities' => 'capabilities',
        'status' => 'status',
        'created_at' => 'created_at',
        'merchant_id' => 'merchant_id',
        'country' => 'country',
        'language_code' => 'language_code',
        'currency' => 'currency',
        'phone_number' => 'phone_number',
        'business_name' => 'business_name'
    );
  
    /**
      * Array of attributes to setter functions (for deserialization of responses)
      * @var string[]
      */
    static $setters = array(
        'id' => 'setId',
        'name' => 'setName',
        'address' => 'setAddress',
        'timezone' => 'setTimezone',
        'capabilities' => 'setCapabilities',
        'status' => 'setStatus',
        'created_at' => 'setCreatedAt',
        'merchant_id' => 'setMerchantId',
        'country' => 'setCountry',
        'language_code' => 'setLanguageCode',
        'currency' => 'setCurrency',
        'phone_number' => 'setPhoneNumber',
        'business_name' => 'setBusinessName'
    );
  
    /**
      * Array of attributes to getter functions (for serialization of requests)
      * @var string[]
      */
    static $getters = array(
        'id' => 'getId',
        'name' => 'getName',
        'address' => 'getAddress',
        'timezone' => 'getTimezone',
        'capabilities' => 'getCapabilities',
        'status' => 'getStatus',
        'created_at' => 'getCreatedAt',
        'merchant_id' => 'getMerchantId',
        'country' => 'getCountry',
        'language_code' => 'getLanguageCode',
        'currency' => 'getCurrency',
        'phone_number' => 'getPhoneNumber',
        'business_name' => 'getBusinessName'
    );
  
    /**
      * $id The location's unique ID.
      * @var string
      */
    protected $id;
    /**
      * $name The location's name. Location names are set by the location owner and displayed in the dashboard as the location's nickname
      * @var string
      */
    protected $name;
    /**
      * $address The location's physical address.
      * @var \SquareConnect\Model\Address
      */
    protected $address;
    /**
      * $timezone The [IANA Timezone Database](https://www.iana.org/time-zones) identifier for the location's timezone.
      * @var string
      */
    protected $timezone;
    /**
      * $capabilities Indicates which Square features are enabled for the location.  See [LocationCapability](#type-locationcapability) for possible values.
      * @var string[]
      */
    protected $capabilities;
    /**
      * $status The location's status  See [LocationStatus](#type-locationstatus) for possible values.
      * @var string
      */
    protected $status;
    /**
      * $created_at The time when the location was created, in RFC 3339 format.
      * @var string
      */
    protected $created_at;
    /**
      * $merchant_id The identifier of the merchant that owns the location.
      * @var string
      */
    protected $merchant_id;
    /**
      * $country The location's country, in ISO 3166-1-alpha-2 format.  See [Country](#type-country) for possible values.
      * @var string
      */
    protected $country;
    /**
      * $language_code The language associated with the location in [BCP 47 format](https://tools.ietf.org/html/bcp47#appendix-A).
      * @var string
      */
    protected $language_code;
    /**
      * $currency The currency used for all transactions at this location, specified in __ISO 4217 format__. For example, the currency for a location processing transactions in the United States is 'USD'.  See [Currency](#type-currency) for possible values.
      * @var string
      */
    protected $currency;
    /**
      * $phone_number The location's phone_number.
      * @var string
      */
    protected $phone_number;
    /**
      * $business_name The location's business_name which is shown to its customers. For example, this is the name printed on its customer's receipts.
      * @var string
      */
    protected $business_name;

    /**
     * Constructor
     * @param mixed[] $data Associated array of property value initializing the model
     */
    public function __construct(array $data = null)
    {
        if ($data != null) {
            if (isset($data["id"])) {
              $this->id = $data["id"];
            } else {
              $this->id = null;
            }
            if (isset($data["name"])) {
              $this->name = $data["name"];
            } else {
              $this->name = null;
            }
            if (isset($data["address"])) {
              $this->address = $data["address"];
            } else {
              $this->address = null;
            }
            if (isset($data["timezone"])) {
              $this->timezone = $data["timezone"];
            } else {
              $this->timezone = null;
            }
            if (isset($data["capabilities"])) {
              $this->capabilities = $data["capabilities"];
            } else {
              $this->capabilities = null;
            }
            if (isset($data["status"])) {
              $this->status = $data["status"];
            } else {
              $this->status = null;
            }
            if (isset($data["created_at"])) {
              $this->created_at = $data["created_at"];
            } else {
              $this->created_at = null;
            }
            if (isset($data["merchant_id"])) {
              $this->merchant_id = $data["merchant_id"];
            } else {
              $this->merchant_id = null;
            }
            if (isset($data["country"])) {
              $this->country = $data["country"];
            } else {
              $this->country = null;
            }
            if (isset($data["language_code"])) {
              $this->language_code = $data["language_code"];
            } else {
              $this->language_code = null;
            }
            if (isset($data["currency"])) {
              $this->currency = $data["currency"];
            } else {
              $this->currency = null;
            }
            if (isset($data["phone_number"])) {
              $this->phone_number = $data["phone_number"];
            } else {
              $this->phone_number = null;
            }
            if (isset($data["business_name"])) {
              $this->business_name = $data["business_name"];
            } else {
              $this->business_name = null;
            }
        }
    }
    /**
     * Gets id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
  
    /**
     * Sets id
     * @param string $id The location's unique ID.
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    /**
     * Gets name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
  
    /**
     * Sets name
     * @param string $name The location's name. Location names are set by the location owner and displayed in the dashboard as the location's nickname
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
    /**
     * Gets address
     * @return \SquareConnect\Model\Address
     */
    public function getAddress()
    {
        return $this->address;
    }
  
    /**
     * Sets address
     * @param \SquareConnect\Model\Address $address The location's physical address.
     * @return $this
     */
    public function setAddress($address)
    {
        $this->address = $address;
        return $this;
    }
    /**
     * Gets timezone
     * @return string
     */
    public function getTimezone()
    {
        return $this->timezone;
    }
  
    /**
     * Sets timezone
     * @param string $timezone The [IANA Timezone Database](https://www.iana.org/time-zones) identifier for the location's timezone.
     * @return $this
     */
    public function setTimezone($timezone)
    {
        $this->timezone = $timezone;
        return $this;
    }
    /**
     * Gets capabilities
     * @return string[]
     */
    public function getCapabilities()
    {
        return $this->capabilities;
    }
  
    /**
     * Sets capabilities
     * @param string[] $capabilities Indicates which Square features are enabled for the location.  See [LocationCapability](#type-locationcapability) for possible values.
     * @return $this
     */
    public function setCapabilities($capabilities)
    {
        $this->capabilities = $capabilities;
        return $this;
    }
    /**
     * Gets status
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }
  
    /**
     * Sets status
     * @param string $status The location's status  See [LocationStatus](#type-locationstatus) for possible values.
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }
    /**
     * Gets created_at
     * @return string
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
  
    /**
     * Sets created_at
     * @param string $created_at The time when the location was created, in RFC 3339 format.
     * @return $this
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
        return $this;
    }
    /**
     * Gets merchant_id
     * @return string
     */
    public function getMerchantId()
    {
        return $this->merchant_id;
    }
  
    /**
     * Sets merchant_id
     * @param string $merchant_id The identifier of the merchant that owns the location.
     * @return $this
     */
    public function setMerchantId($merchant_id)
    {
        $this->merchant_id = $merchant_id;
        return $this;
    }
    /**
     * Gets country
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }
  
    /**
     * Sets country
     * @param string $country The location's country, in ISO 3166-1-alpha-2 format.  See [Country](#type-country) for possible values.
     * @return $this
     */
    public function setCountry($country)
    {
        $this->country = $country;
        return $this;
    }
    /**
     * Gets language_code
     * @return string
     */
    public function getLanguageCode()
    {
        return $this->language_code;
    }
  
    /**
     * Sets language_code
     * @param string $language_code The language associated with the location in [BCP 47 format](https://tools.ietf.org/html/bcp47#appendix-A).
     * @return $this
     */
    public function setLanguageCode($language_code)
    {
        $this->language_code = $language_code;
        return $this;
    }
    /**
     * Gets currency
     * @return string
     */
    public function getCurrency()
    {
        return $this->currency;
    }
  
    /**
     * Sets currency
     * @param string $currency The currency used for all transactions at this location, specified in __ISO 4217 format__. For example, the currency for a location processing transactions in the United States is 'USD'.  See [Currency](#type-currency) for possible values.
     * @return $this
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
        return $this;
    }
    /**
     * Gets phone_number
     * @return string
     */
    public function getPhoneNumber()
    {
        return $this->phone_number;
    }
  
    /**
     * Sets phone_number
     * @param string $phone_number The location's phone_number.
     * @return $this
     */
    public function setPhoneNumber($phone_number)
    {
        $this->phone_number = $phone_number;
        return $this;
    }
    /**
     * Gets business_name
     * @return string
     */
    public function getBusinessName()
    {
        return $this->business_name;
    }
  
    /**
     * Sets business_name
     * @param string $business_name The location's business_name which is shown to its customers. For example, this is the name printed on its customer's receipts.
     * @return $this
     */
    public function setBusinessName($business_name)
    {
        $this->business_name = $business_name;
        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     * @param  integer $offset Offset 
     * @return boolean
     */
    public function offsetExists($offset)
    {
        return isset($this->$offset);
    }
  
    /**
     * Gets offset.
     * @param  integer $offset Offset 
     * @return mixed 
     */
    public function offsetGet($offset)
    {
        return $this->$offset;
    }
  
    /**
     * Sets value based on offset.
     * @param  integer $offset Offset 
     * @param  mixed   $value  Value to be set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        $this->$offset = $value;
    }
  
    /**
     * Unsets offset.
     * @param  integer $offset Offset 
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->$offset);
    }
  
    /**
     * Gets the string presentation of the object
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) {
            return json_encode(\SquareConnect\ObjectSerializer::sanitizeForSerialization($this), JSON_PRETTY_PRINT);
        } else {
            return json_encode(\SquareConnect\ObjectSerializer::sanitizeForSerialization($this));
        }
    }
}
