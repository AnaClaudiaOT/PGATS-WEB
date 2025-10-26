import { faker } from "@faker-js/faker";

export function getRandomNumber() {
  //   return new Date().getTime();
  return faker.number.bigInt();
}

export function getRandomEmail() {
  //   return `qatester${getRandomNumber()}@qatester.com.br`;
  return faker.internet.email({ firstName: "qatesterpgats" });
}

export function createRandomUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.internet.username(),
    company: faker.internet.email(),
    address1: faker.image.avatar(),
    address2: faker.internet.password(),
    state: faker.date.birthdate(),
    city: faker.date.past(),
    zipcode: faker.date.past(),
    mobile_number: faker.date.past(),
  };
}
