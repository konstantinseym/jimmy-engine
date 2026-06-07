    -- SCHEMA

CREATE TABLE settings (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  status TEXT NOT NULL
  );

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT'[]'::JSONB,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

CREATE TABLE likes (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  reply TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  replied_at TIMESTAMPTZ
  );

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);

    -- SEED

INSERT INTO settings (title, subtitle, status) VALUES (
  'Notes on building, better digital things.',
  'Thoughts on web development, design, productivity, and the small systems that make creative work feel less chaotic.',
  'Working on pages'
);

INSERT INTO posts (image_url, image_alt, tags, title, content, excerpt) VALUES (
  'https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/post-images/0001.png',
  'Minimalist workspace with laptop and coffee',
  '["productivity", "mindset"]',
  'Building Focus in a Distracted World',
  'A practical approach to staying consistent, eliminating noise, and actually getting things done without burnout. In a world filled with constant notifications, endless content, and competing priorities, maintaining focus has become a skill rather than a default state. This article explores simple but effective strategies to reduce distractions, build sustainable habits, and create an environment that supports deep work. By understanding how attention works and designing your workflow intentionally, you can achieve meaningful progress without feeling overwhelmed or exhausted.',
  'A practical approach to staying consistent, eliminating noise, and actually getting thing'
),
(
  'https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/post-images/0002.png',
  'Evening city skyline with glowing lights',
  '["lifestyle", "urban"]',
  'Why Cities Feel Different at Night',
  'Exploring how the atmosphere of a city transforms after sunset and why nighttime can boost creativity and reflection. As daylight fades, familiar streets take on a new character, shaped by artificial light, quieter sounds, and a slower rhythm of life. This shift often creates space for introspection, inspiration, and a deeper awareness of surroundings. In this piece, we look at the psychological and sensory changes that occur at night, and how they influence mood, perception, and creative thinking in urban environments.',
  'Exploring how the atmosphere of a city transforms after sunset and why nighttime can boost'
),
(
  'https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/post-images/0003.png',
  'People working together in a modern coworking space',
  '["work", "collaboration"]',
  'The Rise of Coworking Culture',
  'How shared workspaces are reshaping productivity, networking, and the way we approach modern work environments. Coworking spaces have evolved from simple desk rentals into vibrant communities that bring together people from different industries and backgrounds. They encourage collaboration, idea exchange, and flexible work routines that adapt to individual needs. This article examines the growth of coworking culture, its impact on professional relationships, and why it has become a preferred alternative to traditional offices for freelancers, startups, and remote teams alike.',
  'How shared workspaces are reshaping productivity, networking, and the way we approach mod'
),
(
    'https://qqzxvcyqighooxucphxk.supabase.co/storage/v1/object/public/post-images/0004.png',
  'The Rise of Slow Productivity in a Fast Digital World',
  '["MD"]',
  'The Rise of Slow Productivity in a Fast Digital World',
  '# The Rise of Slow Productivity in a Fast Digital World
Modern work has become faster, louder, and more fragmented than ever before. Notifications arrive every few minutes, teams communicate across multiple platforms, and professionals are often expected to respond instantly while still producing thoughtful, high-quality work.
Against this background, a new approach is becoming more relevant: **slow productivity**.
Slow productivity does not mean working less seriously. It means building a healthier, more deliberate relationship with work. Instead of measuring productivity only by speed, output volume, or the number of tasks completed in a day, this mindset focuses on *clarity, sustainability, and meaningful progress*.
## Why speed is not always productivity
For many people, the modern workday feels productive on the surface. They answer emails, attend meetings, update task boards, send messages, and switch between tools constantly. But by the end of the day, it is often difficult to point to one meaningful thing that actually moved forward.
This happens because activity and progress are not the same thing.
A person can spend eight hours reacting to small requests and still avoid the most important work. A team can have daily meetings, detailed dashboards, and constant communication while still moving slowly on the actual product. A freelancer can be busy all day and still feel stuck because most of the work was administrative noise.
> Productivity is not about doing more things. It is about doing the right things with enough attention to make them valuable.
The problem is not technology itself. Digital tools can be extremely useful. The problem starts when every tool becomes a source of urgency.
## The hidden cost of constant switching
One of the biggest enemies of deep work is context switching. Every time we jump from one task to another, the brain needs time to reload the previous context. This is especially true for creative and technical work.
For example, imagine a developer working on a new feature. The actual task might require:
- understanding the existing code structure;
- checking how data flows through the app;
- thinking about edge cases;
- writing the implementation;
- testing the behavior;
- cleaning up the final solution.
If this person is interrupted every ten minutes, the work becomes heavier than it should be. The visible task is still "build a feature", but the invisible cost grows with every interruption.
The same applies to designers, writers, analysts, marketers, founders, and managers. Any work that requires thought becomes worse when attention is constantly broken.
## What slow productivity looks like in practice
Slow productivity is not a single technique. It is a collection of habits and choices that protect attention.
### 1. Fewer priorities
A common mistake is trying to keep ten important things active at the same time. In reality, when everything is important, nothing gets enough energy.
A better approach is to define a small number of active priorities. For example:
1. Finish the current product feature.
2. Improve the onboarding flow.
3. Prepare the next client proposal.
This does not mean other tasks do not matter. It simply means they are not the main focus right now.
### 2. Longer blocks of focused work
Deep work needs space. A 20-minute gap between meetings is usually not enough for meaningful progress. It may be enough to reply to a message, but not enough to solve a complex problem.
A more sustainable schedule might include:
- one or two long focus blocks per day;
- fewer meetings during peak energy hours;
- grouped communication windows;
- clear expectations around response time.
Even a simple rule like **no messages for the first 90 minutes of the workday** can dramatically improve output quality.
### 3. Better definition of done
Slow productivity also depends on clarity. Many tasks feel endless because nobody defines what "done" means.
For example, a vague task might look like this:
Improve the blog page.
A better version would be:
Improve the blog page by adding loading states, empty states, markdown rendering, and responsive spacing for mobile screens.
The second version is easier to start, easier to finish, and easier to evaluate.
When work is clearly defined, progress becomes visible.
## Why this matters for remote teams
Remote work made flexibility more common, but it also created new challenges. Without a physical office, many teams try to compensate with more calls, more updates, and more written communication.
This can easily become overwhelming.
Remote teams need trust and structure. They should not rely on constant online presence as proof that someone is working. A better system focuses on outcomes.
Good remote culture usually includes:
- clear ownership of tasks;
- written decisions;
- realistic deadlines;
- fewer unnecessary meetings;
- async updates where possible;
- respect for different working rhythms.
This does not remove collaboration. It makes collaboration more intentional.
![A calm modern workspace with a laptop, notebook, and soft natural light](https://images.unsplash.com/photo-1497366754035-f200968a6e72)
## The role of tools
Tools can either support slow productivity or destroy it. The difference depends on how they are used.
A task manager, for example, can create clarity. But if every small idea becomes an urgent task, the system becomes noise. A chat app can help people communicate quickly. But if every message demands an instant reply, it becomes a permanent interruption machine.
The best tools are usually the ones that reduce mental load.
For a simple content workflow, a team might use something like:
```js
const workflow = {
  idea: "collect raw thoughts",
  draft: "write the first version",
  review: "improve structure and clarity",
  publish: "ship the final article",
};
```
This kind of structure is basic, but useful. It tells everyone where the work is and what should happen next.
## Slow productivity for freelancers and solo creators
For freelancers, indie developers, and solo creators, slow productivity can be especially powerful. There is no manager forcing priorities, but there is also no one protecting focus.
A solo worker has to be both the strategist and the executor. That creates a constant temptation to jump between planning, building, marketing, learning, and maintenance.
The solution is not to ignore any of these areas. The solution is to separate them.
For example:
- Monday can be focused on planning and admin.
- Tuesday and Wednesday can be focused on building.
- Thursday can be focused on polishing and testing.
- Friday can be focused on publishing, writing, or outreach.
This rhythm is not universal, but it shows the main idea: different types of work deserve different spaces.
## A practical weekly system
A simple weekly system might look like this:
1. Choose one main outcome for the week.
2. Break it into three to five concrete tasks.
3. Put the hardest work into protected focus blocks.
4. Keep a small list of secondary tasks.
5. Review what actually moved forward at the end of the week.
The key is to avoid turning the system itself into another source of work. Productivity systems should be lightweight.
The goal is not to maintain a beautiful dashboard. The goal is to make progress easier.
## Common mistakes
Slow productivity can be misunderstood. It is not about laziness, perfectionism, or avoiding deadlines.
Some common mistakes include:
- using "slow work" as an excuse to delay uncomfortable tasks;
- spending too much time planning and not enough time shipping;
- trying to make every piece of work perfect;
- ignoring feedback for too long;
- confusing calm work with passive work.
The best version of slow productivity still includes momentum. It simply avoids panic as the default mode.
## A healthier definition of progress
The most useful shift is mental. Instead of asking, *"How much did I do today?"*, it may be better to ask:
**"What became clearer, stronger, or more complete today?"**
That question changes the standard. It rewards meaningful movement instead of shallow busyness.
A day with fewer tasks can still be a highly productive day if the right problem moved forward. A week with fewer meetings can be a better week if the team made a real decision. A slower project can become a stronger project if the work is more intentional.
## Final thoughts
Slow productivity is not a rejection of ambition. It is a better foundation for it.
People who want to build useful products, write thoughtful content, grow sustainable businesses, or do creative work over many years need more than energy. They need rhythm. They need attention. They need systems that do not collapse under pressure.
In a world that constantly rewards speed, choosing depth can feel unusual. But for many kinds of modern work, depth is exactly what creates value.
For more background on the broader idea of focused work, you can read about [deep work](https://en.wikipedia.org/wiki/Deep_Work) and how it relates to attention, concentration, and long-term creative output.',
  'Modern work has become faster, louder, and more fragmented than ever before'
);

INSERT INTO comments (post_id, content) VALUES (
    1, 'Great post, very useful thoughts.'
  ),
  (
    1, 'I like the idea about reducing distractions.'
  ),
  (
    2, 'Nice breakdown of the blog structure.'
  ),
  (
    2, 'The database design looks clean and simple.'
  ),
  (
    3, 'Consistency really matters more than motivation.'
  ),
  (
    3, 'Good reminder to focus on small daily progress.'
  );

INSERT INTO likes (post_id) VALUES
(1), (1), (1),
(2), (2), (2), (2),
(3);

    -- ACCESS

CREATE POLICY "Public read settings" ON settings FOR select TO anon, authenticated USING (true);
CREATE POLICY "Public read posts" ON posts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read comments" ON comments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read likes" ON likes FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert comments" ON comments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public insert likes" ON likes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Public insert messages" ON messages FOR INSERT TO authenticated WITH CHECK (true);

GRANT SELECT ON TABLE public.settings TO anon, authenticated;
GRANT SELECT ON TABLE public.posts TO anon, authenticated;
GRANT SELECT ON TABLE public.comments TO anon, authenticated;
GRANT SELECT ON TABLE public.likes TO anon, authenticated;

GRANT INSERT ON TABLE public.comments TO anon, authenticated;
GRANT INSERT ON TABLE public.likes TO anon, authenticated;
GRANT INSERT ON TABLE public.messages TO anon, authenticated;

    -- FUNCTIONS

CREATE FUNCTION get_site_meta()
RETURNS json
LANGUAGE sql
AS $$
SELECT json_build_object(
  'posts', (SELECT COUNT(*) FROM posts),
  'comments', (SELECT COUNT(*) FROM comments),
  'likes', (SELECT COUNT(*) FROM likes),
  'title', (SELECT title FROM settings LIMIT 1),
  'subtitle', (SELECT subtitle FROM settings LIMIT 1),
  'status', (SELECT status FROM settings LIMIT 1)
);
$$;