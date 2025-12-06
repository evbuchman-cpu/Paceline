export function TopographicPattern() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <svg
        className="w-full h-full opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="topographic" x="0" y="0" width="1400" height="1000" patternUnits="userSpaceOnUse">
            {/* Color fills for elevation bands - subtle semi-transparent */}
            <path d="M 180 120 Q 200 115, 220 120 Q 235 130, 230 145 Q 220 155, 200 150 Q 185 140, 180 120 Z"
                  fill="#2C5F4D" fillOpacity="0.08" stroke="none" />
            <path d="M 520 240 Q 560 230, 595 245 Q 615 270, 605 300 Q 580 325, 545 315 Q 515 285, 520 240 Z"
                  fill="#C87350" fillOpacity="0.06" stroke="none" />
            <path d="M 780 480 Q 810 470, 840 485 Q 855 505, 845 525 Q 825 540, 800 530 Q 775 510, 780 480 Z"
                  fill="#2C5F4D" fillOpacity="0.08" stroke="none" />
            <path d="M 1100 420 Q 1135 410, 1170 425 Q 1190 450, 1178 475 Q 1155 495, 1125 485 Q 1095 465, 1100 420 Z"
                  fill="#C87350" fillOpacity="0.06" stroke="none" />
            <path d="M 600 780 Q 640 770, 680 785 Q 710 810, 695 840 Q 665 865, 625 855 Q 590 830, 600 780 Z"
                  fill="#2C5F4D" fillOpacity="0.08" stroke="none" />
            <path d="M 320 750 Q 350 740, 380 755 Q 395 775, 385 795 Q 365 810, 340 800 Q 315 780, 320 750 Z"
                  fill="#C87350" fillOpacity="0.06" stroke="none" />

            {/* Complex organic peak 1 - dense irregular contours with green primary lines */}
            <path d="M 180 120 Q 200 115, 220 120 Q 235 130, 230 145 Q 220 155, 200 150 Q 185 140, 180 120 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 170 115 Q 200 105, 230 115 Q 250 135, 240 160 Q 220 175, 195 165 Q 165 145, 170 115 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 158 108 Q 200 93, 242 108 Q 268 140, 252 178 Q 220 200, 188 183 Q 148 153, 158 108 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 145 100 Q 200 80, 255 100 Q 288 145, 268 198 Q 220 230, 178 205 Q 130 163, 145 100 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 130 90 Q 200 65, 270 90 Q 310 150, 285 220 Q 220 265, 165 230 Q 110 175, 130 90 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Complex organic peak 2 - flowing contours with orange accent */}
            <path d="M 520 240 Q 560 230, 595 245 Q 615 270, 605 300 Q 580 325, 545 315 Q 515 285, 520 240 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 505 230 Q 560 215, 610 235 Q 640 275, 625 320 Q 585 355, 535 335 Q 490 290, 505 230 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 488 218 Q 560 198, 628 223 Q 668 283, 648 345 Q 595 390, 522 360 Q 465 300, 488 218 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 470 205 Q 560 180, 650 210 Q 698 293, 673 373 Q 605 430, 505 390 Q 438 313, 470 205 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />

            {/* Irregular valley/saddle - organic flowing lines */}
            <path d="M 100 450 Q 150 435, 200 455 Q 250 475, 300 460 Q 350 440, 400 460 Q 450 480, 500 465"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 90 475 Q 150 455, 210 480 Q 270 505, 330 485 Q 390 460, 450 485 Q 510 510, 570 490"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 75 505 Q 150 480, 225 510 Q 300 540, 375 515 Q 450 485, 525 515 Q 600 545, 675 520"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 60 540 Q 150 510, 240 545 Q 330 580, 420 550 Q 510 515, 600 550 Q 690 585, 780 555"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Gentle rolling terrain - wider organic curves with spacing */}
            <path d="M 850 180 Q 920 165, 990 185 Q 1060 210, 1130 190 Q 1200 170, 1270 195"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 840 220 Q 920 200, 1000 225 Q 1080 255, 1160 230 Q 1240 205, 1320 235"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 830 270 Q 920 245, 1010 275 Q 1100 310, 1190 280 Q 1280 250, 1370 285"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Small irregular peak cluster with orange accent */}
            <path d="M 780 480 Q 810 470, 840 485 Q 855 505, 845 525 Q 825 540, 800 530 Q 775 510, 780 480 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 765 470 Q 810 455, 855 475 Q 880 510, 865 545 Q 830 570, 790 550 Q 750 520, 765 470 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 748 458 Q 810 438, 872 463 Q 908 518, 888 568 Q 840 605, 778 575 Q 723 533, 748 458 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Ridge with parallel flowing contours */}
            <path d="M 950 680 Q 1020 665, 1090 685 Q 1160 710, 1230 690 Q 1300 670, 1370 695"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 945 710 Q 1020 690, 1095 715 Q 1170 745, 1245 720 Q 1320 695, 1395 725"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 940 745 Q 1020 720, 1100 750 Q 1180 785, 1260 755 Q 1340 725, 1420 760"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Scattered organic small features with color accents */}
            <path d="M 320 750 Q 350 740, 380 755 Q 395 775, 385 795 Q 365 810, 340 800 Q 315 780, 320 750 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 305 740 Q 350 725, 395 745 Q 420 780, 405 815 Q 370 845, 330 825 Q 290 795, 305 740 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            <path d="M 1100 420 Q 1135 410, 1170 425 Q 1190 450, 1178 475 Q 1155 495, 1125 485 Q 1095 465, 1100 420 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 1082 408 Q 1135 393, 1188 413 Q 1218 455, 1200 497 Q 1165 527, 1120 507 Q 1070 475, 1082 408 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Dense nested irregular feature with elevation bands */}
            <path d="M 600 780 Q 640 770, 680 785 Q 710 810, 695 840 Q 665 865, 625 855 Q 590 830, 600 780 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 585 770 Q 640 755, 695 775 Q 735 815, 715 860 Q 670 895, 615 875 Q 565 840, 585 770 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 568 758 Q 640 738, 712 763 Q 762 823, 738 883 Q 680 930, 608 900 Q 538 853, 568 758 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 550 745 Q 640 720, 730 750 Q 792 833, 763 908 Q 690 970, 598 930 Q 510 868, 550 745 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topographic)" />
      </svg>
    </div>
  )
}

// Lighter variant for white backgrounds
export function TopographicPatternLight() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <svg
        className="w-full h-full opacity-[0.10]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="topographic-light" x="0" y="0" width="1400" height="1000" patternUnits="userSpaceOnUse">
            {/* Color fills for elevation bands - subtle semi-transparent */}
            <path d="M 180 120 Q 200 115, 220 120 Q 235 130, 230 145 Q 220 155, 200 150 Q 185 140, 180 120 Z"
                  fill="#2C5F4D" fillOpacity="0.06" stroke="none" />
            <path d="M 520 240 Q 560 230, 595 245 Q 615 270, 605 300 Q 580 325, 545 315 Q 515 285, 520 240 Z"
                  fill="#C87350" fillOpacity="0.05" stroke="none" />
            <path d="M 780 480 Q 810 470, 840 485 Q 855 505, 845 525 Q 825 540, 800 530 Q 775 510, 780 480 Z"
                  fill="#2C5F4D" fillOpacity="0.06" stroke="none" />
            <path d="M 1100 420 Q 1135 410, 1170 425 Q 1190 450, 1178 475 Q 1155 495, 1125 485 Q 1095 465, 1100 420 Z"
                  fill="#C87350" fillOpacity="0.05" stroke="none" />
            <path d="M 600 780 Q 640 770, 680 785 Q 710 810, 695 840 Q 665 865, 625 855 Q 590 830, 600 780 Z"
                  fill="#2C5F4D" fillOpacity="0.06" stroke="none" />
            <path d="M 320 750 Q 350 740, 380 755 Q 395 775, 385 795 Q 365 810, 340 800 Q 315 780, 320 750 Z"
                  fill="#C87350" fillOpacity="0.05" stroke="none" />

            {/* Complex organic peak 1 - dense irregular contours with green primary lines */}
            <path d="M 180 120 Q 200 115, 220 120 Q 235 130, 230 145 Q 220 155, 200 150 Q 185 140, 180 120 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 170 115 Q 200 105, 230 115 Q 250 135, 240 160 Q 220 175, 195 165 Q 165 145, 170 115 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 158 108 Q 200 93, 242 108 Q 268 140, 252 178 Q 220 200, 188 183 Q 148 153, 158 108 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 145 100 Q 200 80, 255 100 Q 288 145, 268 198 Q 220 230, 178 205 Q 130 163, 145 100 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 130 90 Q 200 65, 270 90 Q 310 150, 285 220 Q 220 265, 165 230 Q 110 175, 130 90 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Complex organic peak 2 - flowing contours with orange accent */}
            <path d="M 520 240 Q 560 230, 595 245 Q 615 270, 605 300 Q 580 325, 545 315 Q 515 285, 520 240 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 505 230 Q 560 215, 610 235 Q 640 275, 625 320 Q 585 355, 535 335 Q 490 290, 505 230 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 488 218 Q 560 198, 628 223 Q 668 283, 648 345 Q 595 390, 522 360 Q 465 300, 488 218 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 470 205 Q 560 180, 650 210 Q 698 293, 673 373 Q 605 430, 505 390 Q 438 313, 470 205 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />

            {/* Irregular valley/saddle - organic flowing lines */}
            <path d="M 100 450 Q 150 435, 200 455 Q 250 475, 300 460 Q 350 440, 400 460 Q 450 480, 500 465"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 90 475 Q 150 455, 210 480 Q 270 505, 330 485 Q 390 460, 450 485 Q 510 510, 570 490"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 75 505 Q 150 480, 225 510 Q 300 540, 375 515 Q 450 485, 525 515 Q 600 545, 675 520"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 60 540 Q 150 510, 240 545 Q 330 580, 420 550 Q 510 515, 600 550 Q 690 585, 780 555"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Gentle rolling terrain - wider organic curves with spacing */}
            <path d="M 850 180 Q 920 165, 990 185 Q 1060 210, 1130 190 Q 1200 170, 1270 195"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 840 220 Q 920 200, 1000 225 Q 1080 255, 1160 230 Q 1240 205, 1320 235"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 830 270 Q 920 245, 1010 275 Q 1100 310, 1190 280 Q 1280 250, 1370 285"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Small irregular peak cluster with orange accent */}
            <path d="M 780 480 Q 810 470, 840 485 Q 855 505, 845 525 Q 825 540, 800 530 Q 775 510, 780 480 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 765 470 Q 810 455, 855 475 Q 880 510, 865 545 Q 830 570, 790 550 Q 750 520, 765 470 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 748 458 Q 810 438, 872 463 Q 908 518, 888 568 Q 840 605, 778 575 Q 723 533, 748 458 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Ridge with parallel flowing contours */}
            <path d="M 950 680 Q 1020 665, 1090 685 Q 1160 710, 1230 690 Q 1300 670, 1370 695"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 945 710 Q 1020 690, 1095 715 Q 1170 745, 1245 720 Q 1320 695, 1395 725"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 940 745 Q 1020 720, 1100 750 Q 1180 785, 1260 755 Q 1340 725, 1420 760"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Scattered organic small features with color accents */}
            <path d="M 320 750 Q 350 740, 380 755 Q 395 775, 385 795 Q 365 810, 340 800 Q 315 780, 320 750 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 305 740 Q 350 725, 395 745 Q 420 780, 405 815 Q 370 845, 330 825 Q 290 795, 305 740 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            <path d="M 1100 420 Q 1135 410, 1170 425 Q 1190 450, 1178 475 Q 1155 495, 1125 485 Q 1095 465, 1100 420 Z"
                  stroke="#C87350" strokeWidth="1.3" fill="none" />
            <path d="M 1082 408 Q 1135 393, 1188 413 Q 1218 455, 1200 497 Q 1165 527, 1120 507 Q 1070 475, 1082 408 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />

            {/* Dense nested irregular feature with elevation bands */}
            <path d="M 600 780 Q 640 770, 680 785 Q 710 810, 695 840 Q 665 865, 625 855 Q 590 830, 600 780 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 585 770 Q 640 755, 695 775 Q 735 815, 715 860 Q 670 895, 615 875 Q 565 840, 585 770 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
            <path d="M 568 758 Q 640 738, 712 763 Q 762 823, 738 883 Q 680 930, 608 900 Q 538 853, 568 758 Z"
                  stroke="#C87350" strokeWidth="1.0" fill="none" />
            <path d="M 550 745 Q 640 720, 730 750 Q 792 833, 763 908 Q 690 970, 598 930 Q 510 868, 550 745 Z"
                  stroke="#2C5F4D" strokeWidth="1.2" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topographic-light)" />
      </svg>
    </div>
  )
}

export function TrailMarkerDots() {
  return (
    <div className="flex items-center justify-center gap-2 my-8" aria-hidden="true">
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
      <div className="w-2 h-2 rounded-full bg-[#C87350]" />
    </div>
  )
}
