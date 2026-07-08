import { NextResponse } from 'next/server';

const FORM_EMAIL = 'projectnovaservices@gmail.com';
const FORM_SUBMIT_URL = `https://formsubmit.co/${FORM_EMAIL}`;

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const formData = new URLSearchParams();
    formData.append('name', body.name || '');
    formData.append('phone', body.phone || '');
    formData.append('email', body.email || '');
    formData.append('_subject', `New enquiry from ${body.name || 'unknown'} — ${body.service || 'no service'}`);
    formData.append('College Year', body.collegeYear || '');
    formData.append('Branch', body.branch || '');
    formData.append('Category', body.category || '');
    formData.append('Service', body.service || '');
    formData.append('Description', body.description || '');
    formData.append('Preferred Time', body.preferredTime || 'N/A');

    const res = await fetch(FORM_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (!res.ok) throw new Error(`FormSubmit returned ${res.status}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('FormSubmit error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
