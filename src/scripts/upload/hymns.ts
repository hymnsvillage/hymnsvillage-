import { createClient } from '@supabase/supabase-js'
import english from '@/data/englishHymns.json'
import efik from '@/data/efikHymns.json'
import ibibio from '@/data/ibibioHymns.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // or anon if rules allow insert
)

async function upload() {
  const all = [
    ...english.map((h) => ({ ...h, category: 'English' })),
    ...efik.map((h) => ({ ...h, category: 'Efik' })),
    ...ibibio.map((h) => ({ ...h, category: 'Ibibio' })),
  ]

  const { data, error } = await supabase.from('hymns').insert(all)
  if (error) console.error(error)
  else console.log('Uploaded hymns:', data)
}

upload()
