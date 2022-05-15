#include "filters.h"
#include "filters_internal.h"

void applyBinary(char* filename) {
    IMAGE img = readImg(filename);

    if (img.channelNumber >= 3) {
        applyGrayscale(filename);
        img = readImg("./processedImg.jpg");
    }

    int threshold = computeThreshold(img);

    for (int i=0; i<img.size; i+=img.channelNumber) {
        int greyLvl = *(img.data+i);
        int finalPixel = greyLvl < threshold ? 0 : 255;

        for (int j=i; j < i+img.channelNumber; j++)
            *(img.data+j) = finalPixel;
    }

    submitChanges(img);
    printf("Binary filter applied successfully.\n");
    free(img.data);
}
