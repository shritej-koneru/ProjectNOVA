# Terms of Service

## Data Source
`src/data/terms.ts` — 14 sections, rendered in `src/sections/terms.tsx` as collapsible accordion.

## Sections
1. **Experimental Modifications** — customization, Linux, dual boot, Rainmeter, etc. are experimental
2. **Future Updates** — may alter/break configurations (out of scope of original service)
3. **Performance Disclaimer** — no guarantees on FPS, battery life, boot time, stability
4. **Warranty Void** — OS changes, BIOS/UEFI, partitioning may void manufacturer warranty
5. **Account & Service Bans** — customer assumes risk of TOS violations
6. **Malware & Security** — no guarantee on third-party software security
7. **No Refunds** — case-by-case evaluation
8. **Support & Maintenance** — initial setup only; additional work may incur charges
9. **Hardware Limitations** — software cannot overcome hardware limits
10. **Service Verification** — verify during/after session
11. **Change Reversibility** — some changes may be permanent
12. **Device Access** — physical/remote access required; device must be ready before session
13. **Data Backup** — customer's sole responsibility; NO backup included unless purchased
14. **Liability Limitation** — best-effort basis; not liable for data loss, hardware damage, etc.
15. **Service Acceptance** — by requesting service, customer confirms they've read and accepted all terms

## Display
Rendered on home page as collapsible accordion (`<FAQItem>`-like component).
Each section has a toggle to expand/collapse. Initially all collapsed.
