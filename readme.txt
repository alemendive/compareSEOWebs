- Implementar una aplicación que compare dos valores de SEO entre dos sitios, para esto se pide lo siguiente:
- Un Backend que acceda a la API de google (Pagespeed) y retorne los siguientes datos al Frontend:
- Speed Index
- Time to Interactive
- Un Frontend que permita ingresar dos sitios a comparar y muestre los valores obtenidos de el Backend (de manera de poder compararlos visualmente).
x Subir el código a un repositorio al que podamos acceder (para verlo y ejecutarlo).
Puntos Extras
x Dockerizar
x Guardar las muestras (ej para tener un historial de los valores obtenidos)
Fecha de entrega
Dentro de los 7 días posteriores a la recepción

?url=undefined&strategy=undefined&key=

url = https://www.googleapis.com/pagespeedonline/v5/runPagespeed

https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=undefined&strategy=undefined&key=miapikey&category=performance%2Cseo%2Caccessibility%2Cbest-practices%2Cpwa'

api key: AIzaSyAPvsxEPxawYXJf3MqCaGl95FTQUGuJy_U

API_KEY=AIzaSyAPvsxEPxawYXJf3MqCaGl95FTQUGuJy_U
API_URL=https://www.googleapis.com/pagespeedonline/v5/runPagespeed


https://www.clarin.com

https://www.amazon.com

https://www.github.com

https://www.youtube.com

https://www.mercadolibre.com.ar

Time to Interactive

Speed Index

Comparando las URLs: http%3A%2F%2Fwww.amazon.com: 83.0 http%3A%2F%2Fwww.clarin.com: 92.0

https://www.clarin.com/img/clarin-sharing.png

overall_score = data["lighthouseResult"]["categories"]["performance"]["score"] * 100

speed_index_score = data["lighthouseResult"]["audits"]["speed-index"]["score"]
speed_index = data["lighthouseResult"]["audits"]["speed-index"]["displayValue"]


data["lighthouseResult"]["audits"]["speed-index"]["score"]
data["lighthouseResult"]["audits"]["speed-index"]["displayValue"]
data["lighthouseResult"]["audits"]["interactive"]["score"]
data["lighthouseResult"]["audits"]["interactive"]["displayValue"]

time_interactive_score = data["lighthouseResult"]["audits"]["interactive"]["score"]
time_interactive = data["lighthouseResult"]["audits"]["interactive"]["displayValue"]


{'Comparacion': {'https%3A%2F%2Fwww.amazon.com': [...], 'https%3A%2F%2Fwww.github.com': [...]}}


peed Index: score=0.13, Value=3.7 s
Overall Score: score=66.0, Value=N/A
Time to Interactive: score=0.27, Value=6.0 s
Speed Index: score=0.89, Value=1.3 s
Overall Score: score=76.0, Value=N/A
Time to Interactive: score=0.91, Value=2.3 s


SEPARAR EL TITULO DEL INPUT

78.56106842603174

docker


FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]


pod back ip: 10.44.0.17

pod front ip: 10.44.0.36

pod name: front-85f6b8c79d-gz488
pod name: back-69c4976476-sf4cf


27.765,10










{
    "puntuacion_url1": {
        "Time to Interactive": "9.5 s",
        "Overall Score": 38,
        "Speed Index": {
            "score": 0.29,
            "value": "2.9 s"
        },
        "url": "https://www.clarin.com"
    },
    "puntuacion_url2": {
        "Time to Interactive": "6.1 s",
        "Overall Score": 43,
        "Speed Index": {
            "score": 0.24,
            "value": "3.1 s"
        },
        "url": "https://www.youtube.com"
    }
}