# Maven을 사용하여 빌드하는 단계
FROM maven:3.8.6-eclipse-temurin-17 AS build

# UTF-8 환경 설정
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

#작업 디렉토리 생성
WORKDIR /app

#프로젝트의 POM 파일 및 소스 코드 복사
COPY pom.xml .
COPY src ./src

#Maven 빌드를 실행하여 애플리케이션 패키징
RUN mvn clean package -DskipTests

#실제 실행 환경을 위한 단계 (Java 17)
FROM openjdk:17-alpine

#작업 디렉토리 생성
WORKDIR /app

#빌드 단계에서 생성된 JAR 파일을 복사
COPY --from=build /app/target/*.jar app.jar

#애플리케이션 실행 명령어 설정
ENTRYPOINT ["java", "-Dfile.encoding=UTF-8", "-jar", "/app/app.jar"]