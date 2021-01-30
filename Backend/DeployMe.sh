#
cd /home/public
rm -rf *
git clone https://github.com/luciantin/OI-ulaganje


cd /home/public/OI-ulaganje/ulaganje_web
npm install
npm run build
mv dist /home/public

cd /home/public/OI-ulaganje/server
cp ServeDeamon.sh /home/protected
cp server.js /home/public
cp app.py /home/public

cd /home/protected
chmod +x ServeDeamon.sh
dos2unix ServeDeamon.sh

cd /home/public
npm install express
npm install ws
rm -rf OI-ulaganje

