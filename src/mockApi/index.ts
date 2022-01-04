type LoginForm = {
  email: string,
  password: string,
};

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export async function authenticationRequest(data: LoginForm): Promise<any> {
  await delay(1000);
  if (data.email === "bizzi_test@bizzi.com") {
    return {
      email: "bizzi_test@bizzi.com",
      familyName: "Bizzi",
      givenName: "Test",
      googleId: "104376442523909435270",
      imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Ghx8ZDQwRIUaHpoYHIbKWxZ4q77H-QEm1YxHcAIsQ=s96-c",
      name: "Bizzi Test",
      tokenId: 'bizzi-test-token',
    };
  } else {
    throw Error('Invalid email or password!');
  }
}