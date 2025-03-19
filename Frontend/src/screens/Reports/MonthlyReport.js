import React, { useEffect, useState } from 'react'
import Barchart from '../../Charts/Barchart';

export default function MonthlyReport({datas,selectedReport}) {
    return (
        <div>
            <p>{datas}</p>
          <Barchart data={datas} />
        </div>
      );
}
