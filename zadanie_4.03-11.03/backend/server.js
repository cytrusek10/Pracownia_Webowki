const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// =====================
// IN-MEMORY "DATABASE"
// =====================

const posts = [
  {
    id: 1,
    title: 'Jak sztuczna inteligencja zmienia sposób, w jaki piszemy',
    body: 'Przez ostatnie dwa lata obserwuję, jak modele językowe wkraczają do redakcji, agencji kreatywnych i biurek pisarzy. Nie jako zagrożenie — przynajmniej nie dla wszystkich — ale jako nowe narzędzie, które wymaga nowego podejścia.\n\nPiszę ten artykuł po tygodniu eksperymentów. Używałam Claude\'a, GPT-4 i kilku mniejszych modeli do generowania akapitów, które potem poprawiałam.\n\nNiepokojący nie dlatego, że AI "pisze lepiej ode mnie". Niepokojący, bo granica między moim głosem a głosem modelu rozmywa się w sposób, który trudno uchwycić.',
    userId: 1,
    category: 'Technologia',
    date: '2025-05-12',
  },
  {
    id: 2,
    title: 'Typografia w erze ekranów: co zostało z dawnych zasad',
    body: 'Zasady typografii mają kilkaset lat. Ekrany — kilkadziesiąt. Co z tego zderzenia wyszło?\n\nGutenberg ustalił rytm strony. Baskerville — elegancję. Helvetica — neutralność. A co ustaliła eraSafari, Chrome i Retina Display?\n\nOdpowiedź jest nieoczekiwanie złożona. Z jednej strony zyskaliśmy niespotykaną wcześniej kontrolę nad metrykami czcionek. Z drugiej — zagubiliśmy intuicję.',
    userId: 2,
    category: 'Design',
    date: '2025-05-03',
  },
  {
    id: 3,
    title: 'Kino slow: filmy, które uczą cierpliwości',
    body: 'W świecie TikToka i skróconej uwagi — dlaczego warto siedzieć dwie godziny w skupieniu i patrzeć na rzekę?\n\nTarkowski, Kieślowski, Angelopoulos — reżyserzy, którzy rozumieli, że cisza jest też językiem kina. Że ujęcie trwające 4 minuty może powiedzieć więcej niż 200 montażowych cięć.\n\nSlow cinema to nie estetyczna fanaberia. To filozofia postrzegania.',
    userId: 3,
    category: 'Kultura',
    date: '2025-04-28',
  },
  {
    id: 4,
    title: 'Grawitacja kwantowa: czy jesteśmy blisko teorii wszystkiego?',
    body: 'Fizycy od dekad szukają mostu między ogólną teorią względności a mechaniką kwantową.\n\nORT przewiduje ciągłość czasoprzestrzeni. Mechanika kwantowa — jej ziarnistość. Obie teorie są fenomenalnie dokładne w swoich domenach. Razem — sprzeczne.\n\nTeoria strun, pętle kwantowe, emergent gravity — trzy drogi do jednego celu. Która prowadzi do prawdy?',
    userId: 4,
    category: 'Nauka',
    date: '2025-04-20',
  },
  {
    id: 5,
    title: 'Gruzja — kraj na granicy kontynentów i czasów',
    body: 'Tbilisi pachnie winem i historią. Pojechałam na tydzień, zostałam trzy.\n\nStare miasto Tbilisi to architektura na skraju — drewniane balkony wyrastają ze skał, siary kościoły stoją obok łaźni siarkowych, a kawiarnie z specialty coffee sasiadują z bazarem, gdzie czas zatrzymał się w latach 80.\n\nTo opowieść o tym, co mnie zatrzymało.',
    userId: 5,
    category: 'Podróże',
    date: '2025-04-15',
  },
  {
    id: 6,
    title: 'Stoicyzm w XXI wieku — moda czy mądrość?',
    body: 'Marcus Aurelius w notesie CEO, Epiktet w podcastach o produktywności. Stoicyzm stał się brandem.\n\nMiędzy autentyczną praktyką a self-help marketingiem — gdzie leży granica? Czy można medytować nad "Rozmyślaniami" i jednocześnie sprzedawać kursy online za 997 dolarów?\n\nFilo Zof próbuje odpowiedzieć.',
    userId: 6,
    category: 'Filozofia',
    date: '2025-04-08',
  },
];

const users = [
  { id: 1, name: 'Marta Kowalska', username: 'marta_k', email: 'marta@ink.pl', bio: 'Dziennikarka technologiczna. Pisze o AI od 2019.', city: 'Warszawa' },
  { id: 2, name: 'Piotr Nowak', username: 'pnowak', email: 'piotr@ink.pl', bio: 'Projektant i typograf. Absolwent ASP.', city: 'Kraków' },
  { id: 3, name: 'Anna Wiśniewska', username: 'anna_w', email: 'anna@ink.pl', bio: 'Krytyczka filmowa i teatralna.', city: 'Gdańsk' },
  { id: 4, name: 'Tomasz Bąk', username: 'tbak', email: 'tomasz@ink.pl', bio: 'Doktor fizyki. Popularyzator nauki.', city: 'Wrocław' },
  { id: 5, name: 'Kasia Morawska', username: 'kasia_m', email: 'kasia@ink.pl', bio: 'Podróżniczka i fotografka.', city: 'Poznań' },
  { id: 6, name: 'Rafał Zając', username: 'rzajac', email: 'rafal@ink.pl', bio: 'Filozof i eseista.', city: 'Łódź' },
];

// Mutable comments array
let comments = [
  { id: 1, postId: 1, author: 'Jan Kowalski', email: 'jan@example.com', body: 'Świetny artykuł! Dokładnie to czuję gdy używam tych narzędzi.' },
  { id: 2, postId: 1, author: 'Ewa Nowak', email: 'ewa@example.com', body: 'Ciekawy punkt widzenia. Myślę, że kluczem jest świadomość użytkownika.' },
  { id: 3, postId: 2, author: 'Marek Wiśniewski', email: 'marek@example.com', body: 'Jako typograf z 20-letnim doświadczeniem — w pełni się zgadzam.' },
  { id: 4, postId: 3, author: 'Zofia Bąk', email: 'zofia@example.com', body: 'Tarkowski zmienił moje życie. "Stalker" to arcydzieło.' },
  { id: 5, postId: 4, author: 'Michał Zając', email: 'michal@example.com', body: 'Polecam też książkę "Trzy drogi do kwantowej grawitacji" Smolina.' },
];

let nextCommentId = comments.length + 1;

// =====================
// ROUTES
// =====================

// GET /posts — lista wszystkich postów
app.get('/posts', (req, res) => {
  const list = posts.map(({ id, title, body, userId, category, date }) => ({
    id, title,
    excerpt: body.split('\n')[0],
    userId, category, date,
  }));
  res.json(list);
});

// GET /posts/:id — pojedynczy post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// GET /users/:id — dane użytkownika
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// GET /posts/:id/comments — komentarze do posta
app.get('/posts/:id/comments', (req, res) => {
  const postComments = comments.filter(c => c.postId === Number(req.params.id));
  res.json(postComments);
});

// POST /posts/:id/comments — dodaj komentarz
app.post('/posts/:id/comments', (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const { author, email, body } = req.body;
  if (!author || !body) {
    return res.status(400).json({ error: 'author and body are required' });
  }

  const comment = {
    id: nextCommentId++,
    postId,
    author,
    email: email || '',
    body,
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);
  res.status(201).json(comment);
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.listen(PORT, () => {
  console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
  console.log(`   GET  /posts`);
  console.log(`   GET  /posts/:id`);
  console.log(`   GET  /users/:id`);
  console.log(`   GET  /posts/:id/comments`);
  console.log(`   POST /posts/:id/comments\n`);
});
