package site.solsoltrip.backend.util;

import java.text.DecimalFormat;

public class NumberFormatUtility {
    public static String formatter(final int input) {
        DecimalFormat df = new DecimalFormat("###,###");

        return df.format(input);
    }
}
