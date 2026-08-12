import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const { service } = req.query;

  // Dynamically pulls your ID. Uses '00000' while you wait for Fiverr approval.
  const partnerId = process.env.NEXT_PUBLIC_FIVERR_PARTNER_ID || '00000';
  
  // Construct the base tracking URL
  const baseAffiliateUrl = `https://fiverr.com{partnerId}&brand=fiverrcpa`;
  
  // Create a real-time tracking token instantly
  const uniqueClickId = 'clk_' + Math.random().toString(36).substring(2, 15);

  try {
    // Log the click data to your Supabase table
    await supabase
      .from('platform_redirects')
      .insert([{ 
        user_identifier: 'anonymous_visitor', 
        target_destination: service || 'homepage', 
        click_token: uniqueClickId 
      }]);

    // Append the tracking sub-ID token to your affiliate link
    const finalTrackingUrl = `${baseAffiliateUrl}&aff_sub=${uniqueClickId}`;

    // Perform an instant browser redirection
    res.writeHead(302, { Location: finalTrackingUrl });
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Redirection mapping failed.' });
  }
}
