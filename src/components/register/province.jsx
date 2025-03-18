import React from 'react'

function Province() {
  return (
    <div>
          {/* Province */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Province
              </label>
              <select
                id="province"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Province</option>
                <option value="Krabi">Krabi</option>
                <option value="Bangkok">Bangkok</option>
                <option value="Kanchanaburi">Kanchanaburi</option>
                <option value="Kalasin">Kalasin</option>
                <option value="Kamphaeng Phet">Kamphaeng Phet</option>
                <option value="Khon Kaen">Khon Kaen</option>
                <option value="Chanthaburi">Chanthaburi</option>
                <option value="Chachoengsao">Chachoengsao</option>
                <option value="Chonburi">Chonburi</option>
                <option value="Chainat">Chainat</option>
                <option value="Chaiyaphum">Chaiyaphum</option>
                <option value="Chumphon">Chumphon</option>
                <option value="Chiang Rai">Chiang Rai</option>
                <option value="Chiang Mai">Chiang Mai</option>
                <option value="Trang">Trang</option>
                <option value="Trat">Trat</option>
                <option value="Tak">Tak</option>
                <option value="Nakhon Nayok">Nakhon Nayok</option>
                <option value="Nakhon Pathom">Nakhon Pathom</option>
                <option value="Nakhon Phanom">Nakhon Phanom</option>
                <option value="Nakhon Ratchasima">Nakhon Ratchasima</option>
                <option value="Nakhon Sawan">Nakhon Sawan</option>
                <option value="Nakhon Si Thammarat">Nakhon Si Thammarat</option>
                <option value="Nan">Nan</option>
                <option value="Narathiwat">Narathiwat</option>
                <option value="Nong Bua Lamphu">Nong Bua Lamphu</option>
                <option value="Nong Khai">Nong Khai</option>
                <option value="Nonthaburi">Nonthaburi</option>
                <option value="Buriram">Buriram</option>
                <option value="Pathum Thani">Pathum Thani</option>
                <option value="Prachuap Khiri Khan">Prachuap Khiri Khan</option>
                <option value="Prachinburi">Prachinburi</option>
                <option value="Pattani">Pattani</option>
                <option value="Phra Nakhon Si Ayutthaya">
                  Phra Nakhon Si Ayutthaya
                </option>
                <option value="Phayao">Phayao</option>
                <option value="Phang Nga">Phang Nga</option>
                <option value="Phatthalung">Phatthalung</option>
                <option value="Phichit">Phichit</option>
                <option value="Phitsanulok">Phitsanulok</option>
                <option value="Phetchaburi">Phetchaburi</option>
                <option value="Phetchabun">Phetchabun</option>
                <option value="Phrae">Phrae</option>
                <option value="Phuket">Phuket</option>
                <option value="Maha Sarakham">Maha Sarakham</option>
                <option value="Mukdahan">Mukdahan</option>
                <option value="Mae Hong Son">Mae Hong Son</option>
                <option value="Yasothon">Yasothon</option>
                <option value="Yala">Yala</option>
                <option value="Roi Et">Roi Et</option>
                <option value="Ranong">Ranong</option>
                <option value="Rayong">Rayong</option>
                <option value="Ratchaburi">Ratchaburi</option>
                <option value="Lopburi">Lopburi</option>
                <option value="Lampang">Lampang</option>
                <option value="Lamphun">Lamphun</option>
                <option value="Loei">Loei</option>
                <option value="Sisaket">Sisaket</option>
                <option value="Sakon Nakhon">Sakon Nakhon</option>
                <option value="Songkhla">Songkhla</option>
                <option value="Satun">Satun</option>
                <option value="Samut Prakan">Samut Prakan</option>
                <option value="Samut Songkhram">Samut Songkhram</option>
                <option value="Samut Sakhon">Samut Sakhon</option>
                <option value="Saraburi">Saraburi</option>
                <option value="Sing Buri">Sing Buri</option>
                <option value="Sukhothai">Sukhothai</option>
                <option value="Suphan Buri">Suphan Buri</option>
                <option value="Surat Thani">Surat Thani</option>
                <option value="Surin">Surin</option>
                <option value="Sa Kaeo">Sa Kaeo</option>
                <option value="Nakhon Pathom">Nakhon Pathom</option>
                <option value="Ubon Ratchathani">Ubon Ratchathani</option>
                <option value="Udon Thani">Udon Thani</option>
                <option value="Uttaradit">Uttaradit</option>
                <option value="Uthai Thani">Uthai Thani</option>
                <option value="Amnat Charoen">Amnat Charoen</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                placeholder="Postcode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
    </div>
  )
}

export default Province