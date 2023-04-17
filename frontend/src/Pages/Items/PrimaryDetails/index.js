import React from "react";

const PrimaryDetails = () => {

    return (
        <form className="flex flex-col w-full justify-between gap-4">
              <h2 className="text-xl">
                  Primary Details
              </h2>
              <div className="flex w-full">
                  <div className="flex w-full justify-around gap-4">
                      <div className="flex w-1/3 flex-col gap-1">
                          <div className="flex gap-1 items-center justify-between">
                              <p>
                                Item ID:
                              </p>
                              <p className="flex justify-start w-1/2">
                                Item ID
                              </p>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <p>
                                Release Date:
                              </p>
                              <p className="flex justify-start w-1/2">
                                Release Date
                              </p>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_name">Product Name: </label>
                              <input id="product_name" name="product_name" placeholder={'Product name'}/>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_status">Product Status: </label>
                              <input id="product_status" name="product_status" placeholder={'Status'}/>
                          </div>

                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_series">Product Series: </label>
                              <input id="product_series" name="product_series" placeholder={'Series'}/>
                          </div>
                      </div>
                      <div className="flex w-1/3 flex-col gap-1">
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_sku">Sku: </label>
                              <input id="product_sku" name="product_sku" placeholder={'Sku'}/>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_ean">EAN: </label>
                              <input id="product_ean" name="product_ean" placeholder={'EAN'}/>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_upc">UPC: </label>
                              <input id="product_upc" name="product_upc" placeholder={'UPC'}/>
                          </div>
                          <div className="flex gap-1 items-center justify-between">
                              <label htmlFor="product_amazon_asin">Amazon ASIN: </label>
                              <input id="product_amazon_asin" name="product_amazon_asin" placeholder={'Amazon ASIN'}/>
                          </div>
                          <div className="flex gap-1 items-center justify-between   ">
                              <label htmlFor="product_amazon_fnsku">Amazon FNSKU: </label>
                              <input id="product_amazon_fnsku" name="product_amazon_fnsku" placeholder={'Amazon FNSKU'}/>
                          </div>
                      </div>
                  </div>
              </div>
        </form>
    )
}

export default PrimaryDetails