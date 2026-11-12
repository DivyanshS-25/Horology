# HOROLOGY — Prompt File Generator Tool
$styleBlock = @"
Luxury horology editorial photography, Midnight Navy atmosphere. Deep navy-black background (#050B16 to #0B1A2E) with a soft azure glow behind the subject. One large soft key light from upper left, cool steel-blue rim light from the right, cinematic shadow falloff, controlled studio lighting. Realistic brushed and polished stainless steel with crisp specular lines on bevels, accurate watch proportions, finely detailed dial texture, natural material rendering, premium editorial composition, photorealistic, sharp focus on the subject, 100mm macro lens quality.
"@

$negativeBlock = @"
No text, no lettering, no numerals that are illegible, no logos, no brand names, no watermarks, no signatures, no distorted or duplicated hands, no incorrect dial markings, no warped bezels, no melted or fused components, no plastic-looking metal, no impossible reflections, no oversaturated colours, no lens flare effects, no excessive glow or particle effects, no cartoon or CGI look, no visible faces, no gold or olive colour grading.
"@

$prompts = @{
    # Section A - Homepage & Hero
    "HZ-HERO-001" = "A black-dial stainless steel chronograph archetype with three sub-registers, tachymeter-style bezel and polished bevels, no text on the dial. Tilted about 25 degrees and turned so the dial faces front-right, occupying the right 55% of the frame and bleeding slightly off the right edge. Cool blue rim light on case and bracelet. Dark navy gradient background with a faint azure glow behind the watch and very subtle out-of-focus bokeh. Left 45% is quiet dark negative space. 85mm, f/4, slightly low angle."
    "HZ-HERO-002" = "Extreme close-up of a black sunburst dial: applied indices catching light, one sub-register edge, a sharp hand tip, depth of field falling away to the left. Subject on the right third, left half dark and empty."
    "HZ-HERO-003" = "Portrait recomposition of HZ-HERO-001 using it as reference: same watch and light, watch in the upper 60%, bottom 40% a smooth dark navy gradient for text. 4:5 ratio."
    "HZ-HERO-004" = "Macro of a mechanical movement, brass and rhodium bridges, ruby jewels, blued screws, in cool blue light, deliberately dark and low contrast, subject weighted right. Mean luminance 18% or lower so overlaid text is legible."
    "HZ-HERO-005" = "Dark architectural interior with a minimalist black-glass and brushed steel display wall, four illuminated watch niches, receding perspective, one watch in focus, polished dark floor with soft reflection, navy ambient light."
    "HZ-HERO-006" = "A watchmaker's bench seen low and close, tweezers, loupe, case holder and movement holder, partly out of focus, cool task lamp, no people visible."
    "HZ-HERO-007" = "A steel watch resting on a dark navy suede cushion in an open slim presentation case, lid raised, light pooling on the dial and crystal."

    # Section B - Brand Heroes & Model Tiles
    "HZ-BRD-001" = "Macro of a steel diver-style sports watch, blue-black dial, rotating bezel and three-link bracelet, no crown emblem, subject right. 21:9 ratio."
    "HZ-BRD-002" = "Deep blue-cast macro of a chronograph dial with polished steel hands and bezel edge, large dark field on the left, no lettering. 21:9 ratio."
    "HZ-BRD-003" = "Tool-watch dial macro, matte black dial, angular hands, domed crystal reflections, riveted-style bracelet edge. 21:9 ratio."
    "HZ-BRD-004" = "Macro of a textured ice-white dial with sharp faceted hands and flat distortion-free mirror-polished case edge, cool light. 21:9 ratio."

    # Rolex Archetypes
    "HZ-WAT-001" = "Rolex Submariner archetype: Black dial, steel professional diver, rotating ceramic-style black bezel, date at 3, three-link steel bracelet. Perpendicular front-three-quarter on midnight navy gradient card."
    "HZ-WAT-002" = "Rolex GMT-Master II archetype: Steel sports watch, two-tone blue and black 24-hour bezel, blue GMT hand, five-link jubilee-style bracelet. Midnight navy background."
    "HZ-WAT-003" = "Rolex Datejust archetype: Steel with fluted white gold style bezel, bright blue sunray dial, baton indices, jubilee bracelet. Centered on dark navy card."
    "HZ-WAT-004" = "Rolex Daytona archetype: Steel racing chronograph, black tachymeter bezel, screw-down pushers, three snailed sub-dials. Navy gradient card."
    "HZ-WAT-005" = "Rolex Explorer archetype: Minimalist black lacquer dial with 3-6-9 Arabic numerals, steel smooth bezel, oyster-style three-link bracelet."

    # Omega Archetypes
    "HZ-WAT-006" = "Omega Speedmaster archetype: Matte black step dial chronograph, black tachymeter bezel, asymmetric case with twisted lyre lugs, white baton hands."
    "HZ-WAT-007" = "Omega Seamaster archetype: Blue laser-engraved wave-textured dial, blue ceramic rotating bezel, helium escape valve at 10, skeleton hands, steel bracelet."
    "HZ-WAT-008" = "Omega Constellation archetype: Integrated steel bracelet, iconic side claw details on bezel with Roman numerals, silk-textured opaline dial."
    "HZ-WAT-009" = "Omega De Ville archetype: Slim round classic dress watch, domed silver opaline dial, slender polished hands, black alligator leather strap."

    # Tudor Archetypes
    "HZ-WAT-010" = "Tudor Black Bay archetype: Domed matte black dial, angular snowflake hands, gold gilt accents, anodized black bezel with red 12 triangle, riveted bracelet."
    "HZ-WAT-011" = "Tudor Pelagos archetype: Matte black dial, satin-brushed titanium grey case, luminescent ceramic bezel, white square hour markers, titanium bracelet."
    "HZ-WAT-012" = "Tudor Ranger archetype: Utilitarian tool watch, matte black dial with painted 3-6-9 indices, brushed steel case, olive-green fabric / steel strap."
    "HZ-WAT-013" = "Tudor GMT archetype: Dual-time sport watch, matte burgundy and deep blue 24-hour bezel, snowflake GMT hand, steel riveted bracelet."

    # Grand Seiko Archetypes
    "HZ-WAT-014" = "Grand Seiko Spring Drive archetype: Deep midnight blue gradient dial, blued glide seconds hand, power-reserve indicator sub-dial, Zaratsu mirror polished case."
    "HZ-WAT-015" = "Grand Seiko Snowflake archetype: High-intensity titanium case, pristine snow-drift textured white dial, heat-blued steel seconds hand, Zaratsu mirror bevels."
    "HZ-WAT-016" = "Grand Seiko Hi-Beat archetype: Evolution 9 style case with low center of gravity, deep white birch bark texture dial, wide grooved indices, steel bracelet."
    "HZ-WAT-017" = "Grand Seiko Dress archetype: Ultra-thin manual wind case, ice-blue textured frozen lake ripple dial, dauphine hands, black leather strap."

    # Demo Sets (A Chrono, B Diver, C GMT, D Dress)
    "HZ-SET-A-01" = "Chronograph archetype: Front-dial perpendicular view, 12 at top, hands at 10:10:35, chronograph counters reset to zero, clean dark navy gradient background."
    "HZ-SET-A-02" = "Chronograph archetype: Three-quarter view, 30 degrees yaw, 15 degrees pitch, crown and pushers visible, soft contact reflection."
    "HZ-SET-A-03" = "Chronograph archetype: Side profile view, 90 degrees, crown and pushers to the right, showing case thickness and lug curvature."
    "HZ-SET-A-04" = "Chronograph archetype: Solid steel caseback with concentric machining grain, screw-down rim, no engraved text."
    "HZ-SET-A-05" = "Chronograph archetype: Stainless steel bracelet laid flat in an elegant gentle S-curve, alternating brushed and mirror polished surfaces."
    "HZ-SET-A-06" = "Chronograph archetype: Folding clasp mechanism, closed and half-open macro showing safety lock and micro-adjustment."
    "HZ-SET-A-07" = "Chronograph archetype: Macro of fluted crown and screw-down chronograph pushers, gasket detail, crisp steel knurling."
    "HZ-SET-A-08" = "Chronograph archetype: Dial macro showing centre hand arbor, snailed sub-register grooves, applied faceted indices, luminescent pips."
    "HZ-SET-A-09" = "Chronograph archetype: Generic mechanical chronograph calibre macro showing column wheel, horizontal clutch levers, balance wheel."
    "HZ-SET-A-10" = "Chronograph archetype: Closed dark navy textured presentation box resting on dark surface with soft pool of studio light, no logo."
    "HZ-SET-A-11" = "Chronograph archetype: Presentation warranty card and instruction booklet flat-lay with abstract placeholder geometric lines, no legible text."
    "HZ-SET-A-12" = "Chronograph archetype: Accessories flat-lay: spare bracelet links, steel spring-bar tool, navy microfiber polishing cloth on dark surface."

    # Cutouts (Alpha Transparent)
    "HZ-CUT-001" = "Isolated front cutout of a stainless steel chronograph watch on transparent alpha background, perfectly centered, 12 at top, hands at 10:10:35."
    "HZ-CUT-002" = "Isolated front cutout of a stainless steel professional diver watch on transparent alpha background, black ceramic bezel, 12 at top, hands at 10:10:35."
    "HZ-CUT-003" = "Isolated front cutout of a matte titanium tool diver watch on transparent alpha background, square markers, hands at 10:10:35."
    "HZ-CUT-004" = "Isolated front cutout of a slim luxury dress watch on transparent alpha background, silver sunburst dial, black leather strap."
    "HZ-CUT-005" = "Isolated front cutout of a dual-time GMT watch on transparent alpha background, two-tone bezel, red 24-hour arrow hand."
    "HZ-CUT-006" = "Isolated front cutout of a blue-dial Spring Drive sports watch on transparent alpha background, blued seconds hand, power reserve indicator."

    # Movement Lab
    "HZ-MOV-001" = "Generic mechanical automatic movement archetype: Rhodium-plated bridges with Geneva stripes, perlage mainplate, blued screws, ruby jewels, skeletonized winding rotor."
    "HZ-MOV-002" = "Isolated mainspring barrel component: circular toothed brass barrel drum with open top showing coiled spiral spring steel mainspring."
    "HZ-MOV-003" = "Wheel train assembly: Going train gears, center wheel, third wheel, fourth wheel with polished brass teeth and steel pinions."
    "HZ-MOV-004" = "Swiss lever escapement: Escape wheel with club-tooth geometry, pallet fork with synthetic ruby pallet stones, impulse jewel."
    "HZ-MOV-005" = "Balance wheel and hairspring assembly: Glucydur balance wheel with regulating screws, blued Nivarox/silicon hairspring spiral, balance staff."
    "HZ-MOV-006" = "Oscillating weight / rotor assembly: Heavy tungsten semicircular oscillating mass with ball bearing mount, cotes de Geneve finish."

    # Inspection Dossier & Authenticity
    "HZ-DOS-001" = "Witschi Chronoscope acoustic timing screen: Phosphor-green acoustic twin-line dot pattern graph showing +1 s/d timing rate across navy grid."
    "HZ-DOS-002" = "Microscopic inspection of balance staff pivots and shock-absorber ruby capstone under 40x laboratory magnification."
    "HZ-DOS-003" = "Case serialization inspection: Tangential light revealing crisp alphanumeric factory serial engraving between watch lugs."
    "HZ-AUT-001" = "Forensic inspection: Watchmaker's hand holding a brass 10x loupe over the sapphire crystal of a luxury watch, shallow depth of field, laboratory bench."
    "HZ-AUT-002" = "Laser crown etching macro: Angled tangential illumination revealing the microscopic laser-etched coronet inside sapphire crystal at 6 o'clock."
    "HZ-AUT-003" = "UV light authentication test: 365nm ultraviolet lamp illuminating luminescent dial plots and fluorescent watermark fibers on warranty card."

    # Editorial & Lifestyle
    "HZ-EDT-001" = "Understanding Watch Amplitude: Sine waveform oscilloscope graphic rendered in luminous azure over deep midnight navy background."
    "HZ-EDT-002" = "Box and Papers: Luxury dark emerald green presentation watch box flat-lay with serialized guarantee card, manual booklet, and wax seal tag."
    "HZ-EDT-003" = "Automatic vs Manual Movements: Close-up fingers tactilely winding a polished fluted steel watch crown, macro focus."
    "HZ-LFS-001" = "Snow-capped alpine mountain peaks at blue hour under dark navy twilight sky, mist in valleys, calm serene atmosphere."
    "HZ-LFS-002" = "Exclusive private client viewing salon: Dark navy interior, plush velvet armchair, warm tungsten low-key lighting, mahogany consultation table."
    "HZ-LFS-003" = "Steel watch bracelet links laid diagonally across frame: Macro focus showing alternating brushed satin and mirror-polished chamfers."
}

$promptsDir = Resolve-Path "_source\prompts"
foreach ($id in $prompts.Keys) {
    $scene = $prompts[$id]
    $fileContent = @"
# HOROLOGY ASSET PROMPT: $id
# ========================================================

## STYLE BLOCK:
$styleBlock

## SCENE PROMPT:
$scene

## NEGATIVE BLOCK:
$negativeBlock

## FULL COMBINED GENERATION PROMPT:
$styleBlock $scene $negativeBlock
"@
    $path = Join-Path $promptsDir "$id.txt"
    Set-Content -Path $path -Value $fileContent -Encoding UTF8
}

Write-Host "Generated $($prompts.Count) complete asset prompt files in _source/prompts/"

