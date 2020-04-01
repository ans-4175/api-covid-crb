# api-covid-crb
[https://api-covid-cirebon.now.sh](https://api-covid-cirebon.now.sh)
API yang menyediakan sumber data satu pintu untuk info data ODP, PDP, Positif COVID-19 untuk Kota Cirebon, Kab Cirebon, Provinsi Jawa Barat dan Nasional.

## Sumber Data
Kami mengamati sumber data level Nasional dan Provinsi tidak cukup cepat/cermat dengan data di level Kab/Kota. Sehingga kami memakai sumber data utama di masing-masing daerah.  
1. Kota Cirebon - http://covid19.cirebonkota.go.id - scraping situs
2. Kab Cirebon - http://covid19.cirebonkab.go.id - scraping situs
3. Jawa Barat - https://covid19-public.digitalservice.id/analytics/aggregation/ - API JDS
4. Nasional - https://api.kawalcovid19.id/case/summary - API KawalCovid  
Bonus 5. Kota Bandung - https://covid19.bandung.go.id/api/covid19bdg/v1/covidsummary/get - API situs COVID Bandung

## Teknikal
Menggunakan stack:  
1. [Now](http://zeit.co) - untuk deployment
2. [Stein](https://steinhq.com) - untuk menyimpan data
