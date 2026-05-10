This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. Introducere

Book Explorer este o aplicație web care le permite utilizatorilor să descopere și să organizeze cărți de interes personal. Aplicația este construită folosind Next.js, un framework modern de dezvoltare web. Aceasta utilizează două servicii cloud pentru a oferi funcționalitate completă, ele fiind Google Books API pentru căutarea cărților și MongoDB Atlas pentru stocarea persistentă a datelor.
Aplicația oferă o interfață modernă prin care utilizatorul poate căuta orice carte după titlu sau autor, poate vizualiza detalii despre aceasta (copertă, titlu, autor) și poate salva cărțile favorite pentru a le accesa ulterior. Lista de favorite este stocată permanent în cloud.
Proiectul este publicat pe GitHub și pe platforma Vercel, fiind accesibil public prin internet. Tehnologiile utilizate sunt open-source și gratuite.
Tehnologii utilizate
•	Next.js - framework pentru aplicații web 
•	Tailwind CSS - framework CSS pentru stilizare rapidă 
•	MongoDB Atlas - bază de date NoSQL în cloud
•	Google Books API - API REST pentru căutarea cărților
•	Vercel - platformă de deployment pentru aplicații Next.js
•	GitHub - repository pentru codul sursă

2. Descrierea problemei

În prezent, utilizatorii au acces la un număr foarte mare de cărți în mediul online, însă nu beneficiază întotdeauna de o aplicație simplă pentru căutarea și organizarea acestora. Majoritatea librăriilor online sunt orientate în principal spre vânzare, iar aplicațiile dedicate gestionării lecturilor sunt adesea complexe sau necesită procese complicate de înregistrare.
Book Explorer vine ca o soluție practică și eficientă pentru această problemă. Aplicația permite utilizatorului să caute rapid cărți folosind cuvinte-cheie precum titlul sau autorul, afișând rezultate relevante împreună cu imaginile copertelor. În plus, utilizatorii pot salva cu ușurință cărțile preferate într-o listă personală de favorite.
Aplicația răspunde la două nevoi principale, respectiv nevoia de descoperire, deoarece utilizatorii pot găsi rapid cărți din catalogul Google Books, care include milioane de titluri din întreaga lume și nevoia de organizare, deoarece utilizatorii își pot salva cărțile de interes într-o bază de date cloud persistentă, accesibilă oricând și de pe orice dispozitiv. 
Din punct de vedere tehnic, soluția utilizează două servicii cloud complementare. Google Books API oferă acces la un catalog vast de cărți fără necesitatea unei baze de date proprii. MongoDB Atlas asigură stocarea sigură și persistentă a favoritelor utilizatorilor în cloud.

3. Descriere API

3.1 Google Books API
Google Books API este primul serviciu cloud utilizat în aplicație. Este un serviciu REST public oferit de Google Cloud care permite accesul la catalogul Google Books, conținând milioane de cărți din întreaga lume.
•	Furnizor: Google Cloud Platform
•	Tip: REST API public, fără autentificare pentru căutari
•	Format raspuns: JSON
3.2 MongoDB Atlas
MongoDB Atlas este al doilea serviciu cloud utilizat în aplicație. Este o bază de date NoSQL stocată în cloud, oferită de MongoDB, care asigură stocarea persistentă a cărților favorite ale utilizatorului.
•	Furnizor: MongoDB Inc.
•	Tip: Baza de date NoSQL in cloud
•	Format date: BSON/JSON, fiecare carte salvată este un document cu câmpurile: id, title, authors, thumbnail

4. Flux de date

4.1 Căutare cărți
Utilizatorul introduce un termen de căutare în bara de pe pagina principală și apasă butonul ”Caută”. Frontend-ul trimite un request GET la /api/books?q={termen}. API route-ul intern face un request catre Google Books API. Google returnează un JSON cu lista de cărți. API route-ul procesează răspunsul și returnează datele formatate. Frontend-ul afișeaza cărțile ca un grid de carduri cu copertă, titlu, autor și buton de salvare.
4.2 Salvare carte la favorite
Utilizatorul apasă butonul ”Salvează” pe o carte. Frontend-ul trimite un request POST la /api/favorites cu datele carții in format JSON. API route-ul se conectează la MongoDB Atlas și adaugă cartea în colecția favorites. Utilizatorul vede mesajul de confirmare.
4.3 Vizualizare favorite
Utilizatorul navighează la pagina ”Favorite”. La încărcarea paginii, frontend-ul face automat un request GET la /api/favorites. API route-ul se conectează la MongoDB Atlas și returnează toate documentele din colecția favorites. Frontend-ul afișează cărțile salvate cu buton de ștergere pentru fiecare.

4.4 Ștergere carte din favorite
Utilizatorul apasă butonul ”Șterge” pe o carte. Frontend-ul trimite un request DELETE la /api/favorites/{id}. API route-ul șterge documentul corespunzător din MongoDB Atlas. Lista de favorite se reîncarcă automat.
4.5 Exemple de request / response
GET /api/books?q=Harry Potter
// Response:
[
  {
    "id": "wrOQLV6xB-wC",
    "title": "Harry Potter and the Philosopher's Stone",
    "authors": "J.K. Rowling",
    "thumbnail": "http://books.google.com/..."
  }
]
POST /api/favorites
// Request body:
{ "id": "wrOQLV6xB-wC", "title": "Harry Potter...", "authors": "J.K. Rowling", "thumbnail": "..." }
// Response:
{ "success": true }
DELETE /api/favorites/64e20516af3943a8
// Response:
{ "success": true }
4.6 Metode HTTP utilizate
•	GET - obținerea datelor: căutare cărți și listare favorite
•	POST - crearea datelor: salvarea unei cărți la favorite
•	DELETE - ștergerea datelor: eliminarea unei cărți din favorite

Referințe

1.	Next.js Documentation. https://nextjs.org/docs
2.	Google Books API. https://developers.google.com/books/docs/v1/using
3.	MongoDB Atlas. https://www.mongodb.com/atlas
4.	Tailwind CSS. https://tailwindcss.com/docs
5.	Vercel Platform. https://vercel.com/docs
6.	MongoDB Node.js Driver. https://www.mongodb.com/docs/drivers/node
7.	https://sitemodern.ro/ro/blog/nextjs-tehnologii-moderne

