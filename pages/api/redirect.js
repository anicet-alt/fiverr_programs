import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { service } = req.query;
  const partnerId = process.env.NEXT_PUBLIC_FIVERR_PARTNER_ID || '00000';
  const baseAffiliateUrl = `https://fiverr.com{partnerId}&brand=fiverrcpa`;
  const uniqueClickId = 'clk_' + Math.random().toString(36).substring(2, 15);

  try {
    await supabase
      .from('platform_redirects')
      .insert([{ 
        user_identifier: 'anonymous_visitor', 
        target_destination: service || 'homepage', 
        click_token: uniqueClickId 
      }]);

    const finalTrackingUrl = `${baseAffiliateUrl}&aff_sub=${uniqueClickId}`;
    res.writeHead(302, { Location: finalTrackingUrl });
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Redirection mapping failed.' });
  }
}
