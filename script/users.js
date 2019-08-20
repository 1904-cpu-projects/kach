const users = [
  {
    id: '07fb06de-06ea-4231-81ce-f87de4b506c0', 
    name: 'Hugo Campos',
    streetAddress: '123 Fake St', 
    suite: 'A', 
    city: 'San Luis Obispo', 
    state: 'CA', 
    zip: '92555',
    isAdmin: true, 
    isAuthenticated: true,
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQGoUpmO8mzxtg/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=KHa3IIHYujLbs1iGhHVx8qKKyzIt_eV-QwjDkrblZoA'
  },
  {
    id: '058007a1-144e-4b42-96fe-1a59482b9520', 
    name: 'Katherine Peterson',
    isAdmin: true
  },
  {
    id: '4860421e-9925-401e-8556-bd15cd369b6b', 
    name: 'Connor Stennett'
  },
  {
    id: '5b234fec-bda9-4ed7-a4b5-d126416f1bd9', 
    name: 'Preston Wallace',
    isAdmin: true
  },
  {
    id: '897346bc-e737-4571-9fef-0c2abdd67e03', 
    name: 'Jonathan Mann',
    isAdmin: false
  },
  {
    id: '94db118b-9fc2-4add-8582-4ae409933323', 
    name: 'Eliot Szwajkowski',
    isAdmin: true
  },
].map(user => {
  const nameArr = user.name.split(' ');
  const firstName = nameArr[0];
  const lastName = nameArr[1];
  const email = `${firstName}${lastName}@email.com`;
  const password = 'password1234';
  return { ...user, firstName, lastName, email, password }
});

module.exports = users