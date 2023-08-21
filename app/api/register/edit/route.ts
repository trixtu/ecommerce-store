export async function PATCH(req: Request) {
  const {data: { email, password, vorname, nachname },} = await req.json();

  console.log(email)

}
