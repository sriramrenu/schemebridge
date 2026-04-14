'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 backdrop-blur-lg bg-opacity-95">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last Updated: April 14, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using SchemeBridge (&quot;the Service&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you may not use this Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge is a citizen-first discovery platform designed to help users find government schemes for which they may be eligible. The Service aggregates information from official government sources and presents it in an accessible, searchable format.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Accuracy</h2>
            <p className="text-gray-700 mb-4">
              While we strive to keep all information current and accurate, SchemeBridge makes no warranties regarding the accuracy, completeness, or timeliness of scheme information. Official scheme details should always be verified with government sources before applying.
            </p>
            <p className="text-gray-700 mb-4">
              Users are responsible for verifying all eligibility criteria and requirements directly with the scheme provider.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibility</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge does not process applications or guarantee scheme approval. The Service is for informational purposes only. Users must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Verify all information independently</li>
              <li>Follow official application procedures</li>
              <li>Meet all eligibility requirements</li>
              <li>Provide accurate personal information</li>
              <li>Comply with all applicable laws</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Privacy and Security</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge respects user privacy. Any personal information collected through contact forms or surveys is used solely to improve our Service and will not be sold or shared with third parties without consent. Your data is encrypted and stored securely in compliance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content, design, and functionality of SchemeBridge are protected by copyright and intellectual property laws. Reproduction, modification, or commercial use without permission is prohibited.
            </p>
            <p className="text-gray-700 mb-4">
              Scheme information presented is sourced from official government repositories and is made available for public awareness in compliance with government policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge is provided &quot;as is&quot; without any warranty. We shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Inaccurate or incomplete scheme information</li>
              <li>Loss of eligibility or scheme availability</li>
              <li>Application rejections or delays</li>
              <li>Service interruptions or technical issues</li>
              <li>Any indirect, incidental, or consequential damages</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Acceptable Use</h2>
            <p className="text-gray-700 mb-4">
              Users agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Use automated tools or bots for data scraping</li>
              <li>Transmit malware or unauthorized code</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Interfere with Service operations</li>
              <li>Use the Service for illegal purposes</li>
              <li>Harass or abuse other users or staff</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge may include links to government websites or official scheme portals. We are not responsible for content, privacy practices, or security of third-party sites. Please review their terms separately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Service Modifications</h2>
            <p className="text-gray-700 mb-4">
              SchemeBridge reserves the right to modify, suspend, or discontinue any part of the Service at any time with or without notice. We are not liable for modifications or discontinuance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate your access to the Service for violation of these Terms or misuse of the platform without liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              Any disputes arising from these Terms shall be governed by the laws of India. Both parties agree to submit to the exclusive jurisdiction of courts in New Delhi, India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms and Conditions, please contact us at support@schemebridge.in or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a>.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <p className="text-sm text-gray-600">
              These Terms and Conditions may be updated at any time. Continued use of SchemeBridge after changes constitutes acceptance of the updated Terms. Users will be notified of major changes via email or Service announcement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
