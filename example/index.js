const express = require('express');
const {
  validateBody,
  validateParam,
  validateQuery,
  validateHeader,
  param,
  checkService,
} = require('expressjs-field-validator');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ─── 1. Basic required field validation ──────────────────────────────────────
// POST /users  { "name": "John", "email": "john@example.com" }
app.post('/users',
  validateBody().isToBeRejected().sendErrorCode(422).addParams([
    param('name').isRequired(),
    param('email').isRequired().isEmail(),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'User created', data: req.body });
  }
);

// ─── 2. Number, range, and length validation ─────────────────────────────────
// POST /products  { "title": "Widget", "price": 25, "sku": "AB123" }
app.post('/products',
  validateBody().isToBeRejected().sendErrorCode(422).debug(true).addParams([
    param('title').isRequired().minimumLength(3).maximumLength(100),
    param('price').isRequired().isNumber().minimumNumber(1).maximumNumber(99999),
    param('sku').isRequired().minimumLength(3).maximumLength(20),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Product created', data: req.body });
  }
);

// ─── 3. Boolean, date, includes/excludes, and convertToFormat ────────────────
// POST /events  { "title": "Meetup", "date": "15/03/2026", "type": "online", "isPublic": true }
//   → date is validated as DD/MM/YYYY then converted to YYYY-MM-DD for storage
app.post('/events',
  validateBody().isToBeRejected().addParams([
    param('title').isRequired(),
    param('date').isRequired().isDate().dateFormat('DD/MM/YYYY').convertToFormat('YYYY-MM-DD'),
    param('type').isRequired().shouldInclude(['online', 'offline', 'hybrid']),
    param('isPublic').isBoolean(),
  ]),
  (req, res) => {
    // req.body.date is now in YYYY-MM-DD format
    res.status(201).send({ message: 'Event created', data: req.body });
  }
);

// ─── 4. Param, query, and header validation ──────────────────────────────────
// GET /users/:id?page=1&sort=name  (with Authorization header)
app.get('/users/:id',
  validateParam().isToBeRejected().addParams([
    param('id').isRequired().isNumber(),
  ]),
  validateQuery().isToBeRejected().addParams([
    param('page').isNumber(),
    param('sort').shouldInclude(['name', 'email', 'createdAt']),
  ]),
  validateHeader().isToBeRejected().addParams([
    param('authorization').isRequired(),
  ]),
  (req, res) => {
    res.status(200).send({ message: `User ${req.params.id} fetched` });
  }
);

// ─── 5. Mobile number validation ─────────────────────────────────────────────
// POST /contacts  { "phone": "919876543210" }
app.post('/contacts',
  validateBody().isToBeRejected().addParams([
    param('phone').isRequired()
      .isMobileNumberWithCountryCode('91')
      .isMobileNumberWithCountryCodeMandatory()
      .isMobileNumberWithMinimumLength(10)
      .isMobileNumberWithMaximumLength(10),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Contact saved', data: req.body });
  }
);

// ─── 6. Nested object validation ─────────────────────────────────────────────
// POST /orders  { "item": "Laptop", "address": { "street": "123 Main", "city": "NY", "zip": "10001" } }
app.post('/orders',
  validateBody().isToBeRejected().addParams([
    param('item').isRequired(),
    param('address').isRequired().isObject().addChildren([
      param('street').isRequired(),
      param('city').isRequired(),
      param('zip').isRequired().minimumLength(5).maximumLength(10),
    ]),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Order placed', data: req.body });
  }
);

// ─── 7. Array of objects validation ──────────────────────────────────────────
// POST /cart  { "items": [{ "productId": 1, "qty": 2 }, { "productId": 5, "qty": 1 }] }
app.post('/cart',
  validateBody().isToBeRejected().addParams([
    param('items').isRequired().isArray().addChild(
      param('items-entry').isObject().addChildren([
        param('productId').isRequired().isNumber(),
        param('qty').isRequired().isNumber().minimumNumber(1),
      ])
    ),
  ]),
  (req, res) => {
    res.status(200).send({ message: 'Cart updated', data: req.body });
  }
);

// ─── 8. defaultValue – sets a value when field is undefined/null/'' ──────────
// POST /tasks  { "title": "Do laundry" }  →  status defaults to 'pending', priority defaults to 3
app.post('/tasks',
  validateBody().isToBeRejected().addParams([
    param('title').isRequired(),
    param('status').defaultValue('pending'),
    param('priority').isNumber().defaultValue(3),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Task created', data: req.body });
  }
);

// ─── 9. removeIfEmpty – removes key when value is empty ─────────────────────
// POST /profiles  { "name": "Jane", "bio": "", "tags": [], "meta": {} }
//   → bio, tags, and meta keys are removed from req.body
app.post('/profiles',
  validateBody().isToBeRejected().addParams([
    param('name').isRequired(),
    param('bio').removeIfEmpty(),
    param('tags').isArray().removeIfEmpty(),
    param('meta').isObject().removeIfEmpty(),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Profile created', data: req.body });
  }
);

// ─── 10. defaultValue + removeIfEmpty combined ──────────────────────────────
// POST /settings  { "theme": "" }  →  defaultValue applied first → 'light' is non-empty → key kept
app.post('/settings',
  validateBody().isToBeRejected().addParams([
    param('theme').defaultValue('light').removeIfEmpty(),
    param('language').defaultValue('en'),
    param('notifications').isBoolean().defaultValue(true),
  ]),
  (req, res) => {
    res.status(200).send({ message: 'Settings saved', data: req.body });
  }
);

// ─── 11. defaultValue with nested objects ────────────────────────────────────
// POST /articles  { "title": "Hello", "metadata": {} }
//   → metadata.status defaults to 'draft', metadata.views defaults to 0
app.post('/articles',
  validateBody().isToBeRejected().addParams([
    param('title').isRequired(),
    param('metadata').isObject().addChildren([
      param('status').defaultValue('draft'),
      param('views').isNumber().defaultValue(0),
    ]),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Article created', data: req.body });
  }
);

// ─── 12. defaultValue inside array of objects ───────────────────────────────
// POST /surveys  { "questions": [{ "text": "How are you?" }, { "text": "Rate us", "type": "rating" }] }
//   → questions[0].type defaults to 'text' since it was missing
app.post('/surveys',
  validateBody().isToBeRejected().addParams([
    param('questions').isRequired().isArray().addChild(
      param('questions-entry').isObject().addChildren([
        param('text').isRequired(),
        param('type').defaultValue('text').shouldInclude(['text', 'rating', 'choice']),
        param('required').isBoolean().defaultValue(false),
      ])
    ),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Survey created', data: req.body });
  }
);

// ─── 13. removeIfEmpty with nested children ─────────────────────────────────
// POST /notes  { "title": "My Note", "content": { "summary": "", "body": "Hello", "tags": [] } }
//   → content.summary is removed (empty string), content.tags is removed (empty array)
app.post('/notes',
  validateBody().isToBeRejected().addParams([
    param('title').isRequired(),
    param('content').isRequired().isObject().addChildren([
      param('summary').removeIfEmpty(),
      param('body').isRequired(),
      param('tags').isArray().removeIfEmpty(),
    ]),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Note saved', data: req.body });
  }
);

// ─── 14. defaultValue with isRequired – default applied before validation ───
// POST /registrations  {}  → role defaults to 'attendee', passes isRequired check
app.post('/registrations',
  validateBody().isToBeRejected().addParams([
    param('role').isRequired().defaultValue('attendee')
      .shouldInclude(['attendee', 'speaker', 'organizer']),
    param('sessionCount').isRequired().isNumber().defaultValue(1).minimumNumber(1),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Registered', data: req.body });
  }
);

// ─── 15. Custom validator ────────────────────────────────────────────────────
// POST /payments  { "amount": 150, "currency": "USD" }
app.post('/payments',
  validateBody().isToBeRejected().debug(true).addParams([
    param('amount').isRequired().isNumber().minimumNumber(1)
      .customValidator((value, req, error) => {
        if (value > 10000) {
          error('Amount exceeds maximum allowed limit of 10000');
        }
      }),
    param('currency').isRequired().shouldInclude(['USD', 'EUR', 'GBP', 'INR'])
      .sendErrorMessage('Unsupported currency. Use one of: USD, EUR, GBP, INR'),
  ]),
  (req, res) => {
    res.status(200).send({ message: 'Payment processed', data: req.body });
  }
);

// ─── 16. Forward mode with checkService ──────────────────────────────────────
// GET /dashboard
app.get('/dashboard',
  validateQuery().isToBeForwarded().sendErrorCode(400).addParams([
    param('userId').isRequired().isNumber(),
  ]),
  checkService((req, res, next) => {
    // This middleware is SKIPPED when validation fails
    req.dashboardData = { stats: [1, 2, 3] };
    next();
  }),
  (req, res) => {
    // This always runs — check req.locals for validation errors
    if (req.locals && req.locals.skipService) {
      return res.status(req.locals.statusCode).send(req.locals.data);
    }
    res.status(200).send({ message: 'Dashboard loaded', data: req.dashboardData });
  }
);

// ─── 17. Excludes and error messages ─────────────────────────────────────────
// POST /feedback  { "rating": 4, "comment": "Great!", "type": "bug" }
app.post('/feedback',
  validateBody().isToBeRejected().addParams([
    param('rating').isRequired().isNumber().minimumNumber(1).maximumNumber(5)
      .sendErrorMessage('Rating must be a number between 1 and 5'),
    param('comment').isRequired().maximumLength(500),
    param('type').isRequired().shouldExclude(['spam', 'test'])
      .sendErrorMessage('Invalid feedback type'),
  ]),
  (req, res) => {
    res.status(201).send({ message: 'Feedback submitted', data: req.body });
  }
);

// ─── Start server ────────────────────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }
  console.log(`Server is listening on http://localhost:${PORT}`);
});
