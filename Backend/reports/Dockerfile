FROM maven:3.8.3-openjdk-11 AS builder

WORKDIR /app

COPY pom.xml .
COPY src src
COPY ./src/main/resources/application-prod.properties /app/src/main/resources/application.properties

RUN mvn clean install -DskipTests

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=builder /app/target/reports.jar /app/

EXPOSE 8089

CMD ["java", "-jar", "reports.jar"]