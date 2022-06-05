#Install using Homebrew
brew install k6

#Install using Docker
docker pull grafana/k6

#Install netData on Linux/Mac with one-line installer
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh

#Run script with console output
k6 run test.js

#Run script with console output and netData output
k6 run --out statsd test.js

#Check netData report
http://localhost:19999/