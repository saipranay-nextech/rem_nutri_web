import { SITE_URL } from '@/app/utils/email';

export const generateEmailContent = (data: any) => {
  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 23) return "Normal Weight";
    if (bmi < 25) return "Overweight";
    return "Obese";
  };

  const getBMICategoryDescription = (bmi: number): string => {
    if (bmi < 18.5) return "You are in the underweight range. This may indicate insufficient nutrient intake or other health concerns.";
    if (bmi < 23) return "You are in the healthy weight range for South Asians. This is associated with lower health risks.";
    if (bmi < 25) return "You are in the overweight range for South Asians. This increases your risk of health problems.";
    return "You are in the obese range for South Asians. This significantly increases your risk of health problems.";
  };

  const bmi = data.bmi?.toFixed(1);
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : "Not calculated";

  // Get BMI color
  const getBmiColor = () => {
    if (!bmi) return "#4A90E2";
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return "#EAB308"; // Yellow for Underweight
    if (bmiNum < 23) return "#10B981"; // Green for Normal
    if (bmiNum < 25) return "#F97316"; // Orange for Overweight
    return "#EF4444"; // Red for Obese
  };

  // Map for lifestyle factor icons
  const lifestyleIconMap: Record<string, { color: string, path: string }> = {
    "High Stress": {
      color: "#EF4444",
      path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    "Poor Sleep": {
      color: "#8B5CF6",
      path: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    },
    "Irregular Meals": {
      color: "#F97316",
      path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    "Processed Food": {
      color: "#EAB308",
      path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  };

  // Get lifestyle factors HTML
  let lifestyleFactorsHtml = '';
  if (data.lifestyleFactors && data.lifestyleFactors.length > 0) {
    lifestyleFactorsHtml = data.lifestyleFactors.map((factor: string) => {
      const icon = lifestyleIconMap[factor] || { color: "#4A90E2", path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" };
      return `
        <tr>
          <td style="padding-bottom: 12px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 12px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" style="color: ${icon.color};" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon.path}"></path>
                  </svg>
                </td>
                <td style="vertical-align: middle; font-family: Arial, sans-serif; color: #374151;">
                  ${factor}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    }).join('');
  } else {
    lifestyleFactorsHtml = `
      <tr>
        <td style="font-family: Arial, sans-serif; color: #6B7280; padding-bottom: 12px;">
          No lifestyle factors reported.
        </td>
      </tr>
    `;
  }

  // Get health conditions HTML
  let healthConditionsHtml = '';
  if (data.healthConditions && data.healthConditions.length > 0) {
    healthConditionsHtml = data.healthConditions.map((condition: string) => {
      return `
        <tr>
          <td style="padding-bottom: 12px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="vertical-align: middle; padding-right: 12px;">
                  <svg width="24" height="24" viewBox="0 0 24 24" style="color: #4A90E2;" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </td>
                <td style="vertical-align: middle; font-family: Arial, sans-serif; color: #374151;">
                  ${condition}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    }).join('');
  } else {
    healthConditionsHtml = `
      <tr>
        <td style="font-family: Arial, sans-serif; color: #6B7280; padding-bottom: 12px;">
          No health conditions reported.
        </td>
      </tr>
    `;
  }

  // Get recommended program content
  let recommendedProgramHtml = `
    <tr>
      <td style="padding-bottom: 12px; font-family: Arial, sans-serif; color: #6B7280;">
        No programs recommended at this time.
      </td>
    </tr>
  `;
  
  if (data.recommendedProgram && data.recommendedProgram.length > 0) {
    const programMap = {
      "rem-dia": {
        name: "RemDia",
        fullName: "Type 2 and Pre Diabetes Reversal Programme",
        description: "A personalized program designed to help you achieve remission from Type 2 Diabetes through nutrition.",
        route: "remdia",
        color: "#3B82F6" // Blue
      },
      "rem-bliss": {
        name: "Rem Bliss",
        fullName: "Women's Health Programme",
        description: "A personalized program designed to help manage PCOS/PCOD and menopause symptoms.",
        route: "rembliss",
        color: "#EC4899" // Pink
      },
      "rem-meta": {
        name: "Rem Meta",
        fullName: "Metabolic Health Programme",
        description: "A personalized program designed to tackle metabolic health issues.",
        route: "remmeta",
        color: "#8B5CF6" // Purple
      },
      "rem-fit": {
        name: "Rem Fit",
        fullName: "Weight Management Programme",
        description: "A personalized program designed to help you achieve your health goals.",
        route: "remfit",
        color: "#10B981" // Green
      },
      "rem-balance": {
        name: "Rem Balance",
        fullName: "Weight Maintenance Programme",
        description: "A personalized program designed to help you maintain consistent weight through balanced nutrition.",
        route: "rembalance",
        color: "#FACC15" // Yellow
      },
      "rem-protein": {
        name: "Rem Protein",
        fullName: "Protein Optimization Programme",
        description: "A specialized program focused on optimal protein intake for improved nutrition and health outcomes.",
        route: "remprotein",
        color: "#F97316" // Orange
      }
    };

    // Generate HTML for all recommended programs
    const programsHtml = data.recommendedProgram.map((programId: string) => {
      const program = programMap[programId] || {
        name: programId,
        fullName: "",
        description: "A personalized program designed to help you achieve your health goals.",
        route: programId,
        color: "#4A90E2"
      };

      return `
        <tr>
          <td style="padding-bottom: 24px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #EFF6FF; border-left: 4px solid ${program.color}; border-radius: 6px;">
              <tr>
                <td style="padding: 16px;">
                  <h3 style="font-family: Arial, sans-serif; color: #1E40AF; font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">${program.name} - ${program.fullName}</h3>
                  <p style="font-family: Arial, sans-serif; color: #3B82F6; font-size: 14px; margin: 0 0 16px 0;">${program.description}</p>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 12px;">
                    <tr>
                      <td>
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="background-color: #E5E7EB; height: 10px; border-radius: 9999px;">
                              <table cellpadding="0" cellspacing="0" border="0" width="65%" style="background-color: #4A90E2; background-image: linear-gradient(to right, ${program.color}, #10B981); height: 10px; border-radius: 9999px;">
                                <tr><td></td></tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; padding-bottom: ${data.recommendedProgram.indexOf(programId) < data.recommendedProgram.length - 1 ? '32px' : '0'};">
            <a href="${SITE_URL}/programs/${program.route}" style="font-family: Arial, sans-serif; display: inline-block; background-color: ${program.color}; color: white; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-weight: bold; font-size: 14px;">Learn more about this program →</a>
          </td>
        </tr>
        ${data.recommendedProgram.indexOf(programId) < data.recommendedProgram.length - 1 ? `
        <tr>
          <td style="padding-bottom: 24px; border-bottom: 1px dashed #E5E7EB;"></td>
        </tr>
        <tr>
          <td style="padding-top: 24px;"></td>
        </tr>
        ` : ''}
      `;
    }).join('');

    recommendedProgramHtml = programsHtml;
  }

  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Health Insight Report</title>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width: 620px) {
      .wrapper {
        width: 100% !important;
        max-width: 100% !important;
      }
      .column {
        width: 100% !important;
        display: block !important;
      }
      .section-padding {
        padding: 16px !important;
      }
      .card-padding {
        padding: 16px !important;
      }
      .header-text {
        font-size: 20px !important;
      }
      .spacer {
        display: none !important;
      }
      .mobile-spacer {
        padding-top: 16px !important;
      }
      .mobile-center {
        text-align: center !important;
      }
      .body-padding {
        padding: 10px !important;
      }
      .header-subtext {
        font-size: 14px !important;
      }
      .badge-text {
        font-size: 11px !important;
        padding: 3px 8px !important;
      }
    }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: Arial, sans-serif;" class="body-padding">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 10px;" class="body-padding">
        <!--[if mso]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="960">
        <tr>
        <td align="center" valign="top" width="960">
        <![endif]-->
        <table cellpadding="0" cellspacing="0" border="0" width="960" class="wrapper" style="max-width: 960px; background-color: #FFFFFF; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #4A90E2; background-image: linear-gradient(to right, #4A90E2, #50E3C2); padding: 32px; text-align: left; color: #FFFFFF;" class="section-padding">
              <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: bold; font-family: Arial, sans-serif;" class="header-text">Your Personalized Health Snapshot</h1>
              <p style="margin: 0; opacity: 0.75; font-family: Arial, sans-serif; font-size: 18px;" class="header-subtext">Comprehensive insights into your wellness journey</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;" class="section-padding">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <!-- 2-column layout for desktop, 1-column for mobile -->
                <tr>
                  <!-- Personal Details Column -->
                  <td width="48%" valign="top" class="column">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <tr>
                        <td style="padding: 28px;" class="card-padding">
                          <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #374151; font-family: Arial, sans-serif;">Personal Details</h2>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 12px; border-bottom: 1px solid #E5E7EB;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px; padding-bottom: 8px;">Name</td>
                                    <td align="right" style="font-family: Arial, sans-serif; color: #111827; font-size: 15px; font-weight: 500; padding-bottom: 8px;">${data.name}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">Email</td>
                                    <td align="right" style="font-family: Arial, sans-serif; color: #111827; font-size: 15px; font-weight: 500;"><a href="mailto:${data.email}" style="color: #3B82F6; text-decoration: none;">${data.email}</a></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">Age</td>
                                    <td align="right" style="font-family: Arial, sans-serif; color: #111827; font-size: 15px; font-weight: 500;">${data.age}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 12px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">Gender</td>
                                    <td align="right" style="font-family: Arial, sans-serif; color: #111827; font-size: 15px; font-weight: 500;">${data.gender}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  
                  <!-- Spacer for desktop -->
                  <td width="4%" class="spacer"></td>
                  
                  <!-- Physical Metrics Column -->
                  <td width="48%" valign="top" class="column mobile-spacer">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <tr>
                        <td style="padding: 28px;" class="card-padding">
                          <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #374151; font-family: Arial, sans-serif;">Physical Metrics</h2>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 16px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">Height</td>
                                    <td align="right">
                                      <span style="font-family: Arial, sans-serif; background-image: linear-gradient(45deg, #4A90E2, #50E3C2); color: white; padding: 6px 14px; border-radius: 9999px; font-size: 13px;" class="badge-text">${data.height} cm</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 16px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">Weight</td>
                                    <td align="right">
                                      <span style="font-family: Arial, sans-serif; background-image: linear-gradient(45deg, #4A90E2, #50E3C2); color: white; padding: 6px 14px; border-radius: 9999px; font-size: 13px;" class="badge-text">${data.weight} kg</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 16px;">
                                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <tr>
                                    <td style="font-family: Arial, sans-serif; color: #6B7280; font-size: 15px;">BMI</td>
                                    <td align="right">
                                      <span style="font-family: Arial, sans-serif; background-color: ${getBmiColor()}; color: white; padding: 6px 14px; border-radius: 9999px; font-size: 13px;" class="badge-text">${bmi} (${bmiCategory})</span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Spacer -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td height="40"></td>
                </tr>
              </table>

              <!-- Second row - Lifestyle Factors and Recommended Program -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #F9FAFB; padding: 28px; border-radius: 12px;">
                <tr>
                  <!-- Lifestyle Factors Column -->
                  <td width="48%" valign="top" style="padding-right: 2%;" class="column">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <tr>
                        <td style="padding: 28px;" class="card-padding">
                          <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #374151; font-family: Arial, sans-serif;">Lifestyle Factors</h2>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${lifestyleFactorsHtml}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  
                  <!-- Recommended Program Column -->
                  <td width="48%" valign="top" style="padding-left: 2%;" class="column mobile-spacer">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <tr>
                        <td style="padding: 28px;" class="card-padding">
                          <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #374151; font-family: Arial, sans-serif;">Recommended Program</h2>
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${recommendedProgramHtml}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F3F4F6; padding: 36px; text-align: center;" class="section-padding">
              <p style="font-family: Arial, sans-serif; color: #6B7280; margin: 0 0 20px 0; font-size: 15px;">Report generated on ${timestamp} (IST)</p>
              <a href="${SITE_URL}" style="font-family: Arial, sans-serif; display: inline-block; background-color: #4A90E2; color: white; text-decoration: none; padding: 14px 36px; border-radius: 9999px; font-weight: bold; font-size: 16px;">Explore Wellness Programs</a>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}; 