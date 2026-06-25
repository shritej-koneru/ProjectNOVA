import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  console.log('');
  console.log('═══════════════════════════════════════════');
  console.log('  NEW CONTACT FORM SUBMISSION');
  console.log('═══════════════════════════════════════════');
  console.log(`  Name:           ${body.name}`);
  console.log(`  Phone:          ${body.phone}`);
  console.log(`  Email:          ${body.email}`);
  console.log(`  College Year:   ${body.collegeYear}`);
  console.log(`  Branch:         ${body.branch}`);
  console.log(`  Service:        ${body.service}`);
  console.log(`  Description:    ${body.description}`);
  console.log(`  Preferred Time: ${body.preferredTime || 'N/A'}`);
  console.log('═══════════════════════════════════════════');
  console.log(`  Received at: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════');
  console.log('');

  return NextResponse.json({ success: true });
}
