FROM maven:3.8.3-openjdk-11 AS builder

WORKDIR /app

COPY pom.xml .
COPY src src
COPY ./src/main/resources/application-prod.yaml /app/src/main/resources/application.yaml

RUN mvn clean install -DskipTests

FROM openjdk:11-jre-slim

WORKDIR /app

COPY --from=builder /app/target/Banking-0.0.1.jar /app/

EXPOSE 9000

CMD ["java", "-jar", "Banking-0.0.1.jar"]
