FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/compareseo-0.0.1.jar
COPY ${JAR_FILE} app_compareseo.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app_compareseo.jar"]