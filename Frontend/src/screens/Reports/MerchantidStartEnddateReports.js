import React from 'react'
import Barchart from '../../Charts/Barchart'

export default function MerchantidStartEnddateReports({merchantdamerchantstartdateilydata}) {
  console.log("merchant data id and daily dates" , merchantdamerchantstartdateilydata)
  return (
    <div>
      <p>merchant daily data  </p>
      <Barchart data={merchantdamerchantstartdateilydata} />
    </div>
  )
}
