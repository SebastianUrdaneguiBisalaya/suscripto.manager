CREATE TABLE public.users (
  user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_profile_image TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'America/Lima') NOT NULL,
  updated_at TIMESTAMP
);

CREATE TABLE public.platforms (
  platform_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  platform_name VARCHAR(100) NOT NULL
);

CREATE TABLE public.payment_methods (
  payment_method_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  payment_method VARCHAR(100) NOT NULL
);

CREATE TABLE public.user_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID NOT NULL,
  platform_id UUID NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'America/Lima') NOT NULL,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES public.platforms(platform_id) ON DELETE CASCADE
);

CREATE TABLE public.user_subscription_detail (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_subscription_id UUID NOT NULL,
  start_date TIMESTAMP NOT NULL,
  currency VARCHAR(10) NOT NULL,
  amount INTEGER NOT NULL,
  recurrence VARCHAR(20) NOT NULL,
  card_type VARCHAR(50),
  card_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'America/Lima') NOT NULL,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_subscription_id) REFERENCES public.user_subscriptions(id) ON DELETE CASCADE
);
